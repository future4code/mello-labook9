import { Request, Response } from "express";
import Authenticator from "../services/Authenticator";
import PostBusiness from "../business/PostBusiness";


export default class PostController {

  async getPostsByType (req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string
      const type = req.body.type;

      Authenticator.getToken(token)
      const postType = await new PostBusiness().getPostByType(type)

      res.status(200).send({
        postType
      })
    } catch (err) {
      res.status(402).send({
        message: err.message
      })
    }
  }

  async getFeed (req: Request, res: Response) {
    try {

      const token = req.headers.authorization as string
      const retrieveData = Authenticator.getToken(token)

      const feed = await new PostBusiness().getFeed(retrieveData.id)

      res.status(200).send({
        feed
      })

    } catch (err) {
      res.status(402).send({
        message: err.message
      })
    }
  }
}