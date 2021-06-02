import { IEvent } from "../model/dto/IEvent";
import { MessageUtil } from "../utils/message";
import { ResponseVO } from "../utils/model/vo/responseVo";
import { User } from "../model/dto/User";
import { UserService } from "../service/User";
import { UserDocument } from "../model/User";
import { Model } from "mongoose";
import { Authorization } from "../service/Authorization";

export class UserController extends UserService {
  constructor(userModel: Model<UserDocument>) {
    super(userModel);
  }

  async createController(event: IEvent): Promise<ResponseVO> {
    const body = JSON.parse(event.body);
    const user: User = await new User(body);
    if (!user.email || !user.username || !user.password) {
      return MessageUtil.error(400, "Must inform email, username and password");
    }

    const foundUser = await this.findUserByMailOrUsername(
      user.username,
      user.email
    );

    if (foundUser) {
      return MessageUtil.error(500, "Username and Email already in Use");
    }

    await this.create(user);

    return MessageUtil.successNoContent(201);
  }

  async loginController(event: IEvent): Promise<ResponseVO> {
    const { username, email, password } = JSON.parse(event.body);

    const dbUser = await this.findUserByMailOrUsername(username, email);

    if (!dbUser) {
      return MessageUtil.error(404, "User not found");
    }

    const isPasswordValid = await User.confirmPassword(
      password,
      dbUser.password
    );

    if (!isPasswordValid) {
      return MessageUtil.error(400, "Invalid password");
    }

    const token = await Authorization.generateToken({
      username: dbUser.username,
      userType: dbUser.userType,
    });

    return MessageUtil.success({
      token,
      user: User.generateUserDTO(dbUser),
    });
  }
}
