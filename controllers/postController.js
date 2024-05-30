const Post = require("../models/postModel.js");
const Comment = require("../models/commentModel.js");
const User = require("../models/userModel.js");

const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.userId;

    if (!content) {
      return res.status(400).json({ error: "Please provide content" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPost = new Post({
      content,
      author: user._id,
    });

    await newPost.save();

    user.posts.push(newPost._id);
    await user.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.log("Create post error:", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const getPosts = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const posts = await Post.find({ author: userId })
        .populate('author', 'username')
        .populate('comments');
  
      if (posts.length === 0) {
        return res.status(404).json({ message: "No posts found for this user" });
      }
  
      res.json(posts);
    } catch (error) {
      console.log("Get posts by user error:", error);
      res.status(500).json({ message: "Internal Server error" });
    }
  };
  

const updatePost = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.userId;

    if (!postId || !content) {
      return res.status(400).json({ error: "Please provide postId and content" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to update this post" });
    }

    post.content = content;
    await post.save();

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    console.log("Update post error:", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const deletePost = async (req, res) => {
    try {
      const { postId } = req.body;
      const userId = req.user.userId;
  
      if (!postId) {
        return res.status(400).json({ error: "Please provide postId" });
      }
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      if (post.author.toString() !== userId) {
        return res.status(403).json({ message: "You are not authorized to delete this post" });
      }
  
      await Post.deleteOne({ _id: postId }); // Using deleteOne method to delete the post
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.log("Delete post error:", error);
      res.status(500).json({ message: "Internal Server error" });
    }
  };
  

const likePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.userId;

    if (!postId) {
      return res.status(400).json({ error: "Please provide postId" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }

    res.status(200).json({ message: "Post liked successfully", post });
  } catch (error) {
    console.log("Like post error:", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const addComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.userId;

    if (!postId || !content) {
      return res.status(400).json({ error: "Please provide postId and content" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = new Comment({
      content,
      author: userId,
      post: post._id,
    });

    await newComment.save();

    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.log("Add comment error:", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  addComment,
};
