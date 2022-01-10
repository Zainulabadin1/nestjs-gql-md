import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({nullable:true})
  _id: string;
  
  @Field({nullable:true})
  firstName: string;

  @Field({nullable:true})
  lastName: string;

  @Field({nullable:true})
  dob: Date;

  @Field({nullable:true})
  status: string;

  @Field({nullable:true})
  email: string;

  @Field({nullable:true})
  password: string;

  @Field({nullable:true})
  is_block: boolean;
}
