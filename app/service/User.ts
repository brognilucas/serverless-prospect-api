import { User } from "../model/dto/User";
import { UserDocument } from "../model/User";
import { LeanDocument, Model } from "mongoose";

export class UserService {
  private userModel: Model<UserDocument>;
  constructor(userModel: Model<UserDocument>) {
    this.userModel = userModel;
  }

  async create(user: User): Promise<UserDocument> {
    return this.userModel.create(user);
  }

  async findUserByMailOrUsername(
    username: string,
    email: string
  ): Promise<LeanDocument<UserDocument>> {
    return this.userModel
      .findOne({ $or: [{ username }, { email }] })
      .lean()
      .exec();
  }

  async makeUserAdm(
    username: string,
    email: string
  ): Promise<LeanDocument<UserDocument>> {
    return this.userModel
      .findOneAndUpdate(
        { $or: [{ username }, { email }] },
        { $set: { userType: "administrator" } }
      )
      .lean()
      .exec();
  }
}
