import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User} from './user/user.schema';
import { Signup } from './user/signup.schema';
import * as nodemailer from 'nodemailer';



@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>, //user-model
    @InjectModel(Signup.name) private  signupModel: Model<Signup>  //signup-model
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
  

    /************* When UserID was sent through email on signup */
  // async updateUserStatus(userid : string): Promise<User>{
  //   console.log("User Id id :", userid)
  //   const user = await this.userModel.findById(userid);
  //   console.log("User :", user)
  //   user.status = "active"
  //   return user.save();  
  // }

  /**************** This function finds user by ID, which was extracted from another collection */
  async updateUser(userid: string) {
    console.log("update user:", userid);
    const user = await this.userModel.findById(userid);
    console.log("User :", user)
   user.status = "active";
    return user.save();
  }

  

 /****************** being used to send randmly generated string and acivating user/ updating user's status */
  async updateUserStatus(userid : string){
    console.log("User Id is :", userid)
    const user = await this.signupModel.findOne({random_string : userid});
    console.log("User :", user)
    var date1  = user.date_time;
    console.log("insertion minute is : " , date1.getTime());
    var date2 = new Date();
    console.log("The present minute is:" , date2.getTime());
    var dateDiff = date2.getTime() - date1.getTime();
    console.log("Time difference is:", dateDiff);
    dateDiff = dateDiff/(1000*60);

    console.log("new time", dateDiff);

    if (dateDiff<0.5){
      console.log("your message is visible");
      console.log("User ID is:", user.user_id)
      const status = this.updateUser(user.user_id);       //function call to update user's status
      return status;
    } else {
      const userFromDb = await this.userModel.findById(user.user_id);
      // if(userFromDb.counter>=4){
      //   return 'you have too many attempts.'
      // }
      const randomStringOccurance = await this.signupModel.find({user_id : user.user_id});

      /********* User who's female, Pakistioni national and age less than 30 - gets 5 chances */
      if (userFromDb.gender === "female" && userFromDb.nationality === 'Pakistani' &&  userFromDb.age<30 && randomStringOccurance.length<=5 ){
        this.incrementUserCounter(userFromDb.id)
        this.sendEmail(userFromDb.id)                      //function call to resend randomly generated string
        return 'Your activation time is exceeded, please check your inbox for a new link';

      }
     
      /********* User who's male, Pakistioni national and age less than 20 - gets 6 chances */
      else if (userFromDb.gender === "male" && userFromDb.nationality === 'Pakistani' &&  userFromDb.age<20 && randomStringOccurance.length<=6){
        this.incrementUserCounter(userFromDb.id)
        this.sendEmail(userFromDb.id)                      //function call to resend randomly generated string
        return 'Your activation time is exceeded, please check your inbox for a new link';
      }

      /********* User who's female, American national and age less than 20 - gets 2 chances */
      else if (userFromDb.gender === "female" && userFromDb.nationality === 'American' &&  userFromDb.age<20 && randomStringOccurance.length<=2){
        this.incrementUserCounter(userFromDb.id)
        this.sendEmail(userFromDb.id)                      //function call to resend randomly generated string
        return 'Your activation time is exceeded, please check your inbox for a new link';
      }


      /********* User who's Pakistioni national and age greater than 50 - gets warning and counter reset*/
      else if (userFromDb.nationality === 'Pakistani' &&  userFromDb.age>=50 && randomStringOccurance.length===3){
        
        this.sendEmail(userFromDb.id)
        return 'You have recahed limit for activating your profile, please note..';
      }
      

      else if(randomStringOccurance.length<=4){
        this.incrementUserCounter(userFromDb.id)
        this.sendEmail(userFromDb.id)                      //function call to resend randomly generated string
         return 'Your activation time is exceeded, please check your inbox for a new link';
        }

        else if(randomStringOccurance.length>=5) {
          return 'You have too many attempts';
        }
        
      
      
      //   const randomStringSchema = await this.signupModel.find({user_id : user.user_id});
      // if(randomStringSchema.length>=3){
      //   return 'you have too many attempts.'
      // }
      // this.incrementUserCounter(user.user_id)
      // this.sendEmail(user.user_id)                      //function call to resend randomly generated string
      // console.log("time limit exceeded, new link..");
      // return 'Your activation time is exceeded, please check your inbox for a new link';


    }

}

async sendEmail(userId){

  const user = await this.userModel.findById(userId);
  console.log("User ID is:",userId );
    
  let random_string = Math.random().toString(36).substr(6);
  console.log("The random string generated is: ",random_string);
  var body = {                                                    //body for signup collection
    user_id: userId,                                            
    random_string: random_string,
    date_time: Date.now(),
    counter : 0
   }
    const signup_info = new this.signupModel(body);
    signup_info.save();


  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: "insightsquare59@gmail.com", // generated ethereal user
      pass: "insight@123", // generated ethereal password
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

async incrementUserCounter(userId){

  const user = await this.userModel.findById(userId);
  //user.counter ++;
  user.save();
}

  
}
