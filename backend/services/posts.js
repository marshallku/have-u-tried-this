/* eslint-disable import/extensions */
import { Post, Location } from "../models/index.js";

export async function getAll(_location, page, perPage) {
  const total = await Post.find({ location: _location }).countDocuments();
  const totalPage = Math.ceil(total / perPage);
  const posts = await Post.find({ location: _location })
    .sort({ createdAt: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .populate("location");

  if (posts.length === 0) {
    throw new Error("No data");
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

  const location = await Location.findOne({ wideAddr, localAddr });
  if (!location) {
    throw new Error("Not exists");
  }

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

  await Location.updateOne(
    { wideAddr, localAddr },
    {
      $push: {
        posts: post,
      },
    },
  );

  await post.save();

  return post.id;
}
export async function findById(id) {
  try {
    const post = await Post.findById(id);
    return post;
  } catch (err) {
    throw new Error("No data");
  }
}
export async function findByTitle(_title) {
  const post = await Post.findOne({ title: _title });
  return post;
}
