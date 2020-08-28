import Authenticator from "../services/Authenticator";
import { Request, Response } from "express";
import LikePostBusiness from "../business/LikePostBusiness";

export default class FriendshipController {
  async likePost(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const user = Authenticator.getToken(token);

      await new LikePostBusiness().likePost(user.id, req.body.postId);

      res.status(200).send({
        message: "Post curtido!",
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }

  async dislikePost(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const user = Authenticator.getToken(token);

      await new LikePostBusiness().dislikePost(user.id, req.body.postId);

      res.status(200).send({
        message: "Post descurtido!",
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }
}
