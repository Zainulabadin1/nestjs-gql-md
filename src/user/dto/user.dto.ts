import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserDto{
    @Field()
  _id: string;
  
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  dob: Date;

  @Field()
  status: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  is_block: boolean;
}