import Authenticator from "../services/Authenticator";
import { Request, Response } from "express";
import FriendshipBusiness from "../business/FriendshipBusiness";

export default class FriendshipController {
  async makeFriendship(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const user = Authenticator.getToken(token);

      await new FriendshipBusiness().makeFriendship(user.id, req.body.id);

      res.status(200).send({
        message: "Vocês agora são amigos(a)",
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }

  async undoFriendship(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const user = Authenticator.getToken(token);

      await new FriendshipBusiness().undoFriendship(user.id, req.body.id);

      res.status(200).send({
        message: "Vocês não são mais amigos(a)",
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }
}
