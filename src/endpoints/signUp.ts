import { Request, Response } from "express";
import BaseDatabase from "../database/BaseDatabase";
import { UserBusiness } from "../business/UserBusiness";

export const signUp = async (req: Request, res: Response) => {
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
};
