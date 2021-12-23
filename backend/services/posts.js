/* eslint-disable import/extensions */
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { Post, Location } from "../models/index.js";
import resizeFile from "../utils/file-resize.js";

dotenv.config();

function parseTitle(title) {
  return title.trim().replace("\n", " ");
}

async function checkLocation(wideAddr, localAddr) {
  const location = await Location.findOne({ wideAddr, localAddr });
  if (!location) {
    throw new Error("올바른 지역 명이 아닙니다.");
  }
  return location;
}

export async function findById(id) {
  try {
    const post = await Post.findById(id).populate("author");
    return post;
  } catch (e) {
    throw new Error("존재하지 않는 글입니다.");
  }
}

export async function findByTitle(_title) {
  const post = await Post.findOne({ title: _title });
  return post;
}

export async function getAllPost(page, perPage) {
  const total = await Post.find({}).countDocuments();
  const totalPage = Math.ceil(total / perPage);
  const posts = await Post.find({})
    .sort({ likes: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .populate("location");

  return {
    data: posts,
    pagination: {
      page,
      nextPage: page < totalPage,
    },
  };
}

export async function getAll(_location, page, perPage) {
  // 페이지네이션
  const total = await Post.find({ location: _location }).countDocuments();
  const totalPage = Math.ceil(total / perPage);
  const posts = await Post.find({ location: _location })
    .sort({ createdAt: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .populate("location");

  // 데이터 없는 경우
  if (posts.length === 0) {
    throw new Error("해당 지역의 글이 존재하지 않습니다.");
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
      };
      return data;
    }),
    pagination: {
      page,
      nextPage: page < totalPage,
    },
  };
}
export async function createPost(postDto) {
  const { title, contents, photos, wideAddr, localAddr, authorId } = postDto;

  // 존재하는 지역인지 검증
  checkLocation(wideAddr, localAddr);

  // post 인스턴스 생성
  const post = new Post({
    title: parseTitle(title),
    contents,
    photos: photos.reduce((prev, curr) => {
      prev.push({
        url: process.env.IMG_PATH + curr.filename,
        text: parseTitle(postDto.title),
        filename: curr.filename,
      });
      return prev;
    }, []),
    location: {
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
  resizeFile(photos);

  return post.id;
}

export async function updatePost(postId, newPostDto) {
  // eslint-disable-next-line no-unused-vars
  const { title, content, _photos, _wideAddr, _localAddr, authorId } =
    newPostDto;

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
        content,
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

export async function deletePost(postId, authorId) {
  try {
    const isExist = await Post.findById(postId);
    if (isExist.author.toString() !== authorId.toString()) {
      throw new Error("권한이 없습니다.");
    }
    const post = await Post.findByIdAndDelete(postId);
    // 사진 삭제, DB에서는 삭제 되는지 확인 필요
    const { photos, location } = post;
    photos.forEach((photo) => {
      fs.unlinkSync(path.join(process.env.UPLOAD_PATH, photo.filename));
    });
    await Location.updateOne(
      {
        wideAddr: location.wideAddr,
        localAddr: location.localAddr,
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
