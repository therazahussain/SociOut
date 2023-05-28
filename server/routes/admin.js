import express from "express";
import { blockUserAccount, deleteUserbyAdmin, getAllUsers, makeAdmin, removeAdmin, unBlockUserAccount } from "../controllers/admin.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// fetching all user on admin page
router.get("/getAllUsers", verifyToken, getAllUsers);

// Deleting the user by admin
router.delete("/deleteUser", verifyToken, deleteUserbyAdmin);

// Blocking user account
router.patch("/blockAccount", verifyToken, blockUserAccount);

router.patch("/unblockAccount", verifyToken, unBlockUserAccount);


// Making a user admin
router.patch("/makeAdmin", verifyToken, makeAdmin);

router.patch("/removeAdmin", verifyToken, removeAdmin);


export default router;
