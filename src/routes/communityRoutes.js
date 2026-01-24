import express from "express";
import {
  getPosts,
  createPost,
  addComment,
  replyToComment,
} from "../controllers/communityController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.get("/posts", isAuth, getPosts);
router.post("/posts", isAuth, createPost);
router.post("/posts/:postId/comments", isAuth, addComment);
router.post("/comments/:commentId/reply", isAuth, replyToComment);

export default router;
