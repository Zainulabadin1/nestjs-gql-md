import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsInt, isInt, IsNotEmpty, IsString, Matches, min, MinLength, minLength } from 'class-validator';



@InputType()
export class CreateUserInput {
  @Field({nullable:true})
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  firstName: string;

  @Field({nullable:true})
  @IsAlpha()
  lastName: string;

  @Field({nullable:true})
  dob: Date;

  @Field({nullable:true})
  status: string;

  @Field({nullable:true})
  @IsEmail()
  email: string;

  @MinLength( 8, { each: true } )
  @Field({nullable:true})
  @Matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])')
  password: string;

  @Field({nullable:true})
  is_block: boolean;

  @Field({nullable:true})
  gender: string


  @Field({nullable:true})
  nationality: string
}

@InputType()
export class FindUserInput{
  @Field()
  _id: string;


}
