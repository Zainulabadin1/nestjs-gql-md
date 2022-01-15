import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { UpdateUserInput } from './user/dto/update-user.input';
import { User} from './user/user.schema';



@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }


  async updateUserStatus(userid : string): Promise<User>{
    console.log("User Id id :", userid)
    const user = await this.userModel.findById(userid);
    console.log("User :", user)
    user.status = "active"
    return user.save();
  }
  
}
