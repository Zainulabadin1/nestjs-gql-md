import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import {Signup, SignupSchema} from './signup.schema'

@Module({
  imports: [MongooseModule.forFeature([
    {name : User.name , schema : UserSchema},
  ]),
  MongooseModule.forFeature([{name : Signup.name , schema : SignupSchema}])],
  providers: [UserResolver, UserService]
})
export class UserModule {}
