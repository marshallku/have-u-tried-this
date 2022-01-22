/* eslint-disable import/extensions */
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Post, Location, Bookmark, Comment } from "../models/index";
import { resizeFile } from "../utils/index";
import setPagination from "../utils/pagination";
import { IUserDocument } from "../models/schemas/User";
import { ILocation } from "../models/schemas/Location";

dotenv.config();

function parseTitle(title) {
  return title.trim().replace("\n", " ");
}

async function checkLocation(wideAddr: string, localAddr: string) {
  const location = await Location.findOne({ wideAddr, localAddr });
  if (!location) {
    throw new Error("올바른 지역 명이 아닙니다.");
  }
  return location;
}

export async function findById(id: string, user: IUserDocument) {
  try {
    const post = await Post.findById(id).populate("author");
    let bookmarks = [];
    if (user) {
      // eslint-disable-next-line no-underscore-dangle
      bookmarks = await Bookmark.find({ user: user._id });
    }
    return {
      post,
      isLiked:
        bookmarks.length > 0
          ? bookmarks.some(
              // eslint-disable-next-line no-underscore-dangle
              (bookmark) => bookmark.post.toString() === post._id.toString(),
            )
          : false,
    };
  } catch (e) {
    throw new Error("존재하지 않는 글입니다.");
  }
}

export async function findByTitle(_title: string) {
  const post = await Post.findOne({ title: _title });
  return post;
}

export async function getAllPost(page: number, perPage: number) {
  const pagination = await setPagination(Post, {}, page, perPage);
  const posts = await Post.find({})
    .sort({ likes: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .populate("location");

  return {
    data: posts,
    pagination,
  };
}

export async function getAllLocation(
  user: IUserDocument,
  _location: Omit<ILocation, "posts" | "createdAt" | "updatedAt">,
  page: number,
  perPage: number,
) {
  const condition = { address: _location };
  const pagination = await setPagination(Post, condition, page, perPage);
  const posts = await Post.find(condition)
    .sort({ createdAt: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage);

  // 데이터 없는 경우
  if (posts.length === 0) {
    throw new Error("해당 지역의 글이 존재하지 않습니다.");
  }

  let bookmarks = [];
  if (user) {
    // eslint-disable-next-line no-underscore-dangle
    bookmarks = await Bookmark.find({ user: user._id });
  }

  return {
    data: posts.map((post) => {
      const data = {
        id: post.id,
        wideAddr: _location.wideAddr,
        localAddr: _location.localAddr,
        photo: post.photos[0].url,
        title: post.photos[0].text,
        likes: post.likes,
        isLiked:
          bookmarks.length > 0
            ? bookmarks.some((bookmark) => bookmark.post.toString() === post.id)
            : false,
      };
      return data;
    }),
    pagination,
  };
}
export async function createPost(
  title: string,
  contents: string,
  photos: any,
  wideAddr: string,
  localAddr: string,
  authorId: string,
) {
  // 존재하는 지역인지 검증
  checkLocation(wideAddr, localAddr);

  // post 인스턴스 생성
  const post = new Post({
    title: parseTitle(title),
    contents,
    photos: photos.reduce((prev: any, curr: any) => {
      prev.push({
        url: process.env.IMG_PATH + curr.filename,
        text: parseTitle(title),
        filename: curr.filename,
      });
      return prev;
    }, []),
    address: {
      wideAddr,
      localAddr,
    },
    author: authorId,
  });

  // location에 post data 추가
  await Location.updateOne(
    { wideAddr, localAddr },
    {
      $push: {
        posts: post,
      },
    },
  );

  // post 데이터 저장
  await post.save();

  // 사진 리사이즈
  await resizeFile(photos);

  return post.id;
}

export async function updatePost(
  postId: string,
  title: string,
  contents: string,
  authorId: object,
) {
  try {
    // 포스트 있는지 검증

    const post = await Post.findById(postId);
    if (post.author.toString() !== authorId.toString()) {
      throw new Error("권한이 없습니다.");
    }
    // 새로운 포스트 내용 업데이트
    const newPost = await Post.findByIdAndUpdate(
      postId,
      {
        title: parseTitle(title),
        contents,
        photos: post.photos.map((photo) => {
          // eslint-disable-next-line no-param-reassign
          photo.text = parseTitle(title);
          return photo;
        }),
        updatedAt: Date.now(),
      },
      { new: true },
    );
    return newPost;
  } catch (err) {
    // throw new Error(err);
    throw new Error("존재하지 않는 글입니다.");
  }
}

export async function deletePost(postId: string, authorId: object) {
  try {
    const isExist = await Post.findById(postId);
    if (isExist.author.toString() !== authorId.toString()) {
      throw new Error("권한이 없습니다.");
    }

    await Bookmark.deleteMany({ post: new mongoose.Types.ObjectId(postId) });
    await Comment.deleteMany({ post: new mongoose.Types.ObjectId(postId) });

    const post = await Post.findByIdAndDelete(postId);
    // 사진 삭제, DB에서는 삭제 되는지 확인 필요
    // 관련 코멘트 북마크 모두 삭제
    const { photos, address } = post;
    photos.forEach((photo) => {
      fs.unlinkSync(path.join(process.env.UPLOAD_PATH, photo.filename));
    });
    await Location.updateOne(
      {
        wideAddr: address.wideAddr,
        localAddr: address.localAddr,
      },
      {
        $pull: {
          posts: { _id: postId },
        },
      },
    );
  } catch (e) {
    throw new Error("존재하지 않는 글입니다.");
  }
}
