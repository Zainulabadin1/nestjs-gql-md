import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User} from './user/user.schema';
import { Signup } from './user/signup.schema';
import * as nodemailer from 'nodemailer';



@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Signup.name) private  signupModel: Model<Signup>
  ) {}

  getHello(): string {
    return 'Hello World!';
  }


  // async updateUserStatus(userid : string): Promise<User>{
  //   console.log("User Id id :", userid)
  //   const user = await this.userModel.findById(userid);
  //   console.log("User :", user)
  //   user.status = "active"
  //   return user.save();  
  // }

  async updateUser(userid: string) {
    console.log("update user:", userid);
    const user = await this.userModel.findById(userid);
    console.log("User :", user)
   user.status = "active";
    return user.save();
  }

  async updateUserStatus(userid : string){
    console.log("User Id is :", userid)
    const user = await this.signupModel.findOne({random_string : userid});
    console.log("User :", user)
    var date1  = user.date_time;
    // var inserted_time = date1.getMinutes();
    console.log("insertion minute is : " , date1.getTime());
    var date2 = new Date();
    // var present_time =  today.getMinutes() ;
    console.log("The present minute is:" , date2.getTime());
    var dateDiff = date2.getTime() - date1.getTime();
    console.log("Time difference is:", dateDiff);
    dateDiff = dateDiff/(1000*60);

    console.log("new time", dateDiff);

    if (dateDiff<2){
      console.log("your message is visible");
      console.log("User ID is:", user.user_id)
      const status = this.updateUser(user.user_id);
      return status;
    } else {

      this.sendEmail(user.user_id)
      console.log("time limit exceeded, new link..");
      return 'Your time is exceeded, please click here to get a new link';
    }



}

async sendEmail(userId){

  const user = await this.userModel.findById(userId);
  console.log("User ID is:",userId );
    
  let random_string = Math.random().toString(36).substr(6);
  console.log("The random string generated is: ",random_string);
  var body = {
    user_id: userId,
    random_string: random_string,
    date_time: Date.now() }
    const signup_info = new this.signupModel(body);
    signup_info.save();


  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: "mousajaved123@gmail.com", // generated ethereal user
      pass: "mous@123", // generated ethereal password
      expires: 30000
    },
  });
 
  console.log("Code has reached here successfully");
    transporter.sendMail({
      from: '"Fred Foo 👻" <mousajaved123@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Please click to activate ", // plain text body
      html: `<p>Respected User, Please click <a href="http://localhost:3000/user/${random_string}">here</a> to activate your account</p>`
    })
    .then((success) => {
      console.log(success);
    })
    .catch((err) => {
      console.log(err);
    });

}

  
}
