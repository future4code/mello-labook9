import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import BaseDatabase from "../database/BaseDatabase";

export default class UserController {
  async signUp(req: Request, res: Response) {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;

      const userBusiness = new UserBusiness();
      const token = await userBusiness.signUp(name, email, password);

      res.status(200).send({
        message: "Usuário criado com sucesso",
        token,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    } finally {
      BaseDatabase.destroyConnection();
    }
  }

  async login(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const userBusiness = new UserBusiness();
      const token = await userBusiness.login(email, password);

      res.status(200).send({
        message: "Usuário logado com sucesso",
        token,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    } finally {
      BaseDatabase.destroyConnection();
    }
  }
}
