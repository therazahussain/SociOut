import Post from "../models/Post.js";
import User from "../models/User.js";
import fs from "fs";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
      reports: {},
    });
    await newPost.save();

    const post = await Post.find();
    (post.reverse())
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    (post.reverse())
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    (post.reverse());
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    console.log(isLiked);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


/* UPDATE */
export const reportPost = async (req, res) => {

  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isReported = post.reports.get(userId);

    if (isReported) {
      post.reports.delete(userId);
    } else {
      post.reports.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { reports: post.reports },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


// Adding The Comments
export const addComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment, picturePath, _id, username } = req.body;
    console.log(req.body);

    await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: { comment: comment, postedBy: { picturePath, username, userId: _id } } }
      }
    );

    const updatedPost = await Post.findById(postId);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};




// DELETE
export const deleteUserPost = async (req, res) => {

  // get the post id from the params which we want to delete
  const postId = req.params.postId;

  // find the post in the database and the take the path.
  const post = await Post.findById(postId);
  const path = post.picturePath;
  // the path in the server where the picture is stores
  const directoryPath = ("public/assets/" + path);

  try {
    // deleting the post from the database.
    await post.deleteOne()

    // posts after deleting the post 
    const posts = await Post.find();
    (posts.reverse());

    // the post we want to delete have any picture or not 
    if (path) {

      // checking if the there is any other post with same picture name so that if we delete the file from server there will not be any error afterwards for loading the image.
      const similarPost = await Post.find({ picturePath: path });
      const user = await User.find({ picturePath: path });

      // checking if any other user don't have the same image as their profile picture or post.
      if (user.length === 0 && similarPost.length === 0) {
        fs.unlinkSync(directoryPath);
      }
    }
    res.status(200).json(posts);
  }
  catch (err) {
    res.status(404).json({ message: err.message });
  }
};