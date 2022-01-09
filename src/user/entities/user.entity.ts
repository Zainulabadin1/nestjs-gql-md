import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@ObjectType()
@Schema({collection: 'user'})
export class User {
  @Field()
  id: number

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  dob: Date

  @Field()
  status: string
  
  @Field()
  email: string

  @Field()
  password: string

  @Field()
  is_block: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & mongoose.Document;
