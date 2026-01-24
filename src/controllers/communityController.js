import CommunityPost from "../models/CommunityPost.js";
import Comment from "../models/Comment.js";

// @desc    Get posts by category
// @route   GET /api/community/posts?category=...
// @access  Private
export const getPosts = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category) {
      filter.category = category;
    }

    const posts = await CommunityPost.find(filter)
      .populate("author", "name role") // Minimal user info
      .populate({
        path: "comments",
        select: "content author createdAt", // Minimal comment info for list view
      })
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json({ status: "success", count: posts.length, data: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new post
// @route   POST /api/community/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const { _id } = req.user;

    const newPost = await CommunityPost.create({
      title,
      content,
      category,
      author: _id,
    });

    res.status(201).json({ status: "success", data: newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add comment to a post
// @route   POST /api/community/posts/:postId/comments
// @access  Private
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    const { _id } = req.user;

    // Verify post exists
    const post = await CommunityPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = await Comment.create({
      content,
      postId,
      author: _id,
    });

    res.status(201).json({ status: "success", data: newComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reply to a comment
// @route   POST /api/community/comments/:commentId/reply
// @access  Private
export const replyToComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { commentId } = req.params; // Parent comment ID
    const { _id } = req.user;

    const parentComment = await Comment.findById(commentId);
    if (!parentComment) {
      return res.status(404).json({ message: "Parent comment not found" });
    }

    const reply = await Comment.create({
      content,
      postId: parentComment.postId,
      parentCommentId: commentId,
      author: _id,
    });

    res.status(201).json({ status: "success", data: reply });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
