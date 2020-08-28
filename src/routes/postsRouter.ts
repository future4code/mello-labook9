import express from "express";
import PostController from "../controller/PostController";
import LikePostController from "../controller/LikePostController";

export const postsRouter = express.Router();

const postsController = new PostController();
const likePostController = new LikePostController();

postsRouter.post("/create", postsController.createPost);
postsRouter.post("/like", likePostController.likePost);
postsRouter.post("/dislike", likePostController.dislikePost);
