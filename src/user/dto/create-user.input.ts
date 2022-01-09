import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  dob: Date;

  @Field({nullable:true})
  status: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;

  @Field()
  is_block: boolean;
}

@InputType()
export class FindUserInput{
  @Field()
  _id: string;


}
