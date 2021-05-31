import { IEvent } from "../model/dto/IEvent";
import { MessageUtil } from "../utils/message";
import { ResponseVO } from "../utils/model/vo/responseVo";
import { User } from "../model/dto/User";
import { UserService } from "../service/User";
import { UserDocument } from "../model/User";
import { Model } from "mongoose";

export class UserController  extends UserService {

    constructor(userModel: Model<UserDocument>){
        super(userModel);
    }

    async createController(event: IEvent): Promise<ResponseVO>{
        const body = JSON.parse(event.body); 
        const user: User = await new User(body); 
        console.log({user});
        if (!user.email || !user.username || !user.password){
            throw 'Must inform email, username and password'; 
        }

        const foundUser = await this.findUserByMailOrUsername(user.username, user.email);
       
        if (foundUser){
            throw 'Username and Email already in Use';
        }

        await this.create(user);

        return MessageUtil.successNoContent(201); 
    }

}