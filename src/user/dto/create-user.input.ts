import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsInt, isInt, IsNotEmpty, IsString, Matches, min, MinLength, minLength } from 'class-validator';



@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  firstName: string;

  @Field()
  @IsAlpha()
  lastName: string;

  @Field()
  dob: Date;

  @Field({nullable:true})
  status: string;

  @Field()
  @IsEmail()
  email: string;

  @MinLength( 8, { each: true } )
  @Field()
  @Matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])')
  password: string;

  @Field()
  is_block: boolean;
}

@InputType()
export class FindUserInput{
  @Field()
  _id: string;


}
