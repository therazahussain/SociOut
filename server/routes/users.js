import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  deleteUser,
  searchUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.post("/searchUser", verifyToken, searchUser);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

// Delete user
router.delete("/:id/deleteUser", deleteUser);

export default router;
