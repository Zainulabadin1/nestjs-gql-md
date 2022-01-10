import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserInput, FindUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User} from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

   async create(createUser: CreateUserInput) : Promise<User> {
    const user = new this.userModel(createUser);

    const saltOrRounds = 10;
    const password = createUser.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    // console.log("hash is : ", hash)
    // const isMatch = await bcrypt.compare(password, hash);
    // console.log("compared password : ", isMatch)
    user.password = hash;

    var currentDate = new Date();
        var years = currentDate.getFullYear()
        var dob = createUser.dob;
        var year = dob.getFullYear()
        const age = years - year;
        user.age = age;


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

  async activeUsers() : Promise<User[]>
    {  return this.userModel.find({status : "active"})
    }

  async inActiveUsers() : Promise<User[]>
    {
       return this.userModel.find({status : "inactive"})
    }

  async blockedUsers() : Promise<User[]>
    { 
      return this.userModel.find({is_block : "true"})
    }

  async unblockedUsers() : Promise<User[]>
    { 
      return this.userModel.find({is_block : "false"})
    }  

  async blockUser(updateblock : UpdateUserInput) : Promise<User>
    {
        const user = await this.userModel.findById(updateblock._id);
        user.is_block = updateblock.is_block
        return user.save();
    }
}
