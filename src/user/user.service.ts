import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserInput, FindUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User} from './user.schema';
import {Signup} from './signup.schema';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';



@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Signup.name) private  signupModel: Model<Signup>
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
        
        
        // async..await is not allowed in global scope, must use a wrapper
        
   let userID = user.id
   console.log("User ID is:",userID );
    
  let random_string = Math.random().toString(36).substr(6);
  console.log("The random string generated is: ",random_string);


    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
     // let testAccount = await nodemailer.createTestAccount();
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "insightsquare59@gmail.com", // generated ethereal user
          pass: "insight@123", // generated ethereal password
          expires: 30000
        },
      });
      var htmlLinkTest = '<p>Respected User, Please click <a href="http://localhost:3000/user/' + userID + '>here</a> to activate your account</p>'; 
     //var htmlLink = `<p>Respected User, Please click <a href="http://localhost:3000/user/${userID}">here</a> to activate your account</p>`;
      // send mail with defined transport object
      
      //console.log("Html link is: ",htmlLink);
      console.log("Html link test is: ",htmlLinkTest);
      console.log("Code has reached here successfully");
        transporter.sendMail({
          from: '"Fred Foo 👻" <mousajaved123@gmail.com>', // sender address
          to: user.email, // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Please click to activate ", // plain text body
          //html: `<p>Respected User, Please click <a href="http://localhost:3000/user/${userID}">here</a> to activate your account</p>`
          html: `<p>Respected User, Please click <a href="http://localhost:3000/user/${random_string}">here</a> to activate your account</p>`
        })
        .then((success) => {
          console.log(success);
        })
        .catch((err) => {
          console.log(err);
        });
      
      
      console.log("email is : " , user.email)
      //console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    
    main().catch(console.error);

        const save=  user.save();

  var body = {
    user_id: userID,
    random_string: random_string,
    date_time: Date.now() }
  const signup_info = new this.signupModel(body);
  signup_info.save();
  return save;


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

    async activateUser(activate : UpdateUserInput) : Promise<User>
    {
        const user = await this.userModel.findById(activate._id);
        user.status = activate.status
        return user.save();
    }

    
}



