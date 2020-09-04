import { Request, Response } from "express";
import Authenticator from "../services/Authenticator";
import PostBusiness from "../business/PostBusiness";
import IdGenerator from "../services/IdGenerator";
import moment from "moment";

export default class PostController {
  async getPostsByType(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const type = req.body.type;

      Authenticator.getToken(token);
      const postType = await new PostBusiness().getPostByType(type);

      res.status(200).send({
        postType,
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }

  async getFeed(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const retrieveData = Authenticator.getToken(token);

      const feed = await new PostBusiness().getFeed(retrieveData.id);

      res.status(200).send({
        feed,
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }

  async createPost(req: Request, res: Response) {
    try {
      const { photo, description, type } = req.body;
      const token = req.headers.authorization as string;
      const tokenData = Authenticator.getToken(token);
      const postDate = moment().format("YYYY-MM-DD");
      const id = new IdGenerator().generate();

      await new PostBusiness().createPost(
        id,
        photo,
        description,
        postDate,
        type,
        tokenData.id
      );
      res.status(200).send({
        message: "Post criado com sucesso",
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }
}
