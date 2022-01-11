import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserInput, FindUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User} from './user.schema';
import * as bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

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

        /*******..................................nodemailer work starts.......................................................... */
        "use strict";
        const nodemailer = require("nodemailer");
        
        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
          // Generate test SMTP service account from ethereal.email
          // Only needed if you don't have a real mail account for testing
          let testAccount = await nodemailer.createTestAccount();
        
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "mousajaved123@gmail.com", // generated ethereal user
              pass: "mous@123", // generated ethereal password
            },
          });
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <mousajaved123@gmail.com>', // sender address
            to: "amina.damore57@ethereal.email, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }
        
        main().catch(console.error);
    
    
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
