import { Router } from "express";

import {
  editUserAbout,
  followUser,
  getUser,
  getUserFollowers,
  getUserProfile,
  getUsers,
  searchUsers,
  unFollowUser,
  uploadCoverPhoto,
  uploadProfilePhoto,
  validateEmail,
  validateUsername,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.get("/user", authenticate, getUser);
userRouter.get("/user/all", authenticate, getUsers);
userRouter.get("/user/:username", authenticate, getUserProfile);
userRouter.patch("/user/:userId", authenticate, editUserAbout);
userRouter.get("/user/followers/:username", getUserFollowers);
userRouter.post("/user/follow", authenticate, followUser);
userRouter.post("/user/unfollow", authenticate, unFollowUser);
userRouter.post("/validateUsername", validateUsername);
userRouter.post("/validateEmail", validateEmail);
userRouter.get("/users/search", searchUsers);
userRouter.post("/user/updatecoverphoto", authenticate, uploadCoverPhoto);
userRouter.post("/user/updateprofilephoto", authenticate, uploadProfilePhoto);

export default userRouter;
