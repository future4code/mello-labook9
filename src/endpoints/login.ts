import { Request, Response } from "express";
import BaseDatabase from "../database/BaseDatabase";
import { UserBusiness } from "../business/UserBusiness";

export const login = async (req: Request, res: Response) => {
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
};
