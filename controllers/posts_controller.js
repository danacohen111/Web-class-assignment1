const PostModel = require("../models/posts_model");

const createPost = async (req, res) => {
    const postBody = req.body;
    try {
      const post = await PostModel.create(postBody);
      res.status(201).send(post);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

const getPostsBySender = async (senderId, res) => {
  try {
    const posts = await PostModel.find({ senderID: senderId });
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await PostModel.findById(postId);
    if (post) {
      res.send(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllPosts = async (req, res) => {
  const senderId = req.query.sender;
  if (senderId) {
    return getPostsBySender(senderId, res);
  }
  try {
    const posts = await PostModel.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  if (!title && !content) {
    return res.status(400).send("At least one of title or content is required");
  }

  try {
    const updateFields = {};
    if (title) updateFields.title = title;
    if (content) updateFields.content = content;

    const post = await PostModel.findByIdAndUpdate(
      postId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
    createPost,
    getAllPosts,
    updatePost,
    getPostById,
    getPostsBySender
};