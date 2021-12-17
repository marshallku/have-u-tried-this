/* eslint-disable import/extensions */
import fs from "fs";
import path from "path";
import { Post, Location } from "../models/index.js";
import resizeFile from "../utils/file-resize.js";

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
        title: post.photos[0].title,
        likes: post.likes,
      };
      return data;
    }),
    pagination: {
      page,
      perPage,
      totalPage,
    },
  };
}
export async function createPost(postDto) {
  const { title, content, photos, wideAddr, localAddr } = postDto;

  // 존재하는 지역인지 검증
  const location = await Location.findOne({ wideAddr, localAddr });
  if (!location) {
    throw new Error("올바른 지역 명이 아닙니다.");
  }

  // post 인스턴스 생성
  const post = new Post({
    title,
    content,
    photos: photos.reduce((prev, curr) => {
      prev.push({
        url: curr.filename,
        text: postDto.title,
      });
      return prev;
    }, []),
    location: {
      wideAddr,
      localAddr,
    },
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
export async function findById(id) {
  try {
    const post = await Post.findById(id);
    return post;
  } catch (e) {
    throw new Error("존재하지 않는 글입니다.");
  }
}
export async function findByTitle(_title) {
  const post = await Post.findOne({ title: _title });
  return post;
}

export async function deletePost(postId) {
  try {
    const post = await Post.findByIdAndDelete(postId);
    // 사진 삭제, DB에서는 삭제 되는지 확인 필요
    const { photos, location } = post;
    // eslint-disable-next-line no-underscore-dangle
    const __dirname = path.resolve();
    photos.forEach((photo) => {
      fs.unlinkSync(path.join(__dirname, "public/uploads", photo.url));
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
