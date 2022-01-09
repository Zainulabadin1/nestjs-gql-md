import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserInput, FindUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User} from './user.schema';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  create(createUser: CreateUserInput) : Promise<User> {
    const user = new this.userModel(createUser);
    return user.save();
  }

  findAll() : Promise <User[]> {
    return this.userModel.find().exec();
  }

  async findOne(user : FindUserInput): Promise<User> {
    return this.userModel.findById(user._id);
  }

  async update(updateUser: UpdateUserInput) : Promise<User> {
    const user = await this.userModel.findOne(new Types.ObjectId(updateUser._id));
    user.firstName = updateUser.firstName;
    user.lastName = updateUser.lastName;
    user.dob = updateUser.dob;
    user.status = updateUser.status;
    user.email = updateUser.email;
    user.password = updateUser.password;
    user.is_block = updateUser.is_block;
    return user.save();
  }

}
