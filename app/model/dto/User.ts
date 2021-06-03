import bcrypt from "bcrypt";
import { UserDTO } from "./UserDTO";

interface IUser {
  username: string;

  password: string;

  name: string;

  email: string;

  userType: "administrator" | "default";

  encryptPassword(password: string): void;
}

export class User extends UserDTO implements IUser {
  constructor(user: IUser) {
    super();

    this.username = user.username;
    this.encryptPassword(user.password);
    this.email = user.email;
    this.userType = "default";
  }

  encryptPassword(password: string): void {
    this.password = bcrypt.hashSync(password, 10);
  }

  static async confirmPassword(
    password: string,
    encrypted: string
  ): Promise<boolean> {
    return bcrypt.compare(password, encrypted);
  }

  static generateUserDTO(user: UserDTO): UserDTO {
    delete user["password"];

    return user;
  }
}
