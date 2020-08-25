import express from "express";
import { signUp } from "../endpoints/signUp";
import { login } from "../endpoints/login";

export const userRouter = express.Router();

userRouter.post("signup", signUp);
userRouter.post("/login", login);
