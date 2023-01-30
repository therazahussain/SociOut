import express from "express";
import { getFeedPosts, getUserPosts, likePost, deleteUserPost, addComments } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
// To delete the user Post
router.delete("/:postId", verifyToken, deleteUserPost);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:postId/comments", verifyToken, addComments);

export default router;
