import * as jwt from "jsonwebtoken";

interface AuthenticationData {
  id: string;
}

export default class Authenticator {
  public generateToken(input: AuthenticationData) {
    return jwt.sign(input, process.env.JWT_KEY as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  static getToken(token: string) {
    const tokenData = jwt.verify(token, process.env.JWT_TOKEN as string);

    return tokenData as AuthenticationData;
  }
}
