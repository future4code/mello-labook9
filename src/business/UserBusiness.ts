import IdGenerator from "../services/IdGenerator";
import HashManager from "../services/HashManager";
import Authenticator from "../services/Authenticator";
import { UserDatabase } from "../database/UserDatabase";
import User from "../model/User";

export class UserBusiness {
  public async signUp(
    name: string,
    email: string,
    password: string
  ): Promise<string> {
    if (!name || !email || !password) {
      throw new Error("Insira todas as informações necessárias para cadastro");
    }

    if (password.length < 6) {
      throw new Error("A senha deve conter no mínimo seis caracteres");
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const hashManager = new HashManager();
    const hashPassword = await hashManager.hash(password);

    const userDatabase = new UserDatabase();
    await userDatabase.createUser(id, name, email, hashPassword);

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id });

    return token;
  }

  public async login(email: string, password: string): Promise<string> {
    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserByEmail(email);

    const hashManager = new HashManager();
    const isPasswordCorrect = await hashManager.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Usuário ou senha errados!");
    }

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id: user.id });

    return token;
  }
}
