import express from "express";
import UserController from "../controller/UserController";
import FriendshipController from "../controller/FriendshipController";
import PostController from "../controller/PostController";

export const userRouter = express.Router();

const userController = new UserController();
const friendshipController = new FriendshipController();
const postController = new PostController();

userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.login);

userRouter.post("/makefriendship", friendshipController.makeFriendship);
userRouter.delete("/undofriendship", friendshipController.undoFriendship);

userRouter.post("/createpost", postController.createPost);
userRouter.get("/getbytype", postController.getPostsByType);
userRouter.get("/getfeed", postController.getFeed);
