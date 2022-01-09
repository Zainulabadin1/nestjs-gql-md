import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput, FindUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDto } from './dto/user.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserDto)
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Query(() => [UserDto])
  users() {
    return this.userService.findAll();
  }

  @Query(() => UserDto)
  findUser(@Args('input') input: FindUserInput) {
    return this.userService.findOne(input);
  }

  @Mutation(() => UserDto)
  updateUser(@Args('input') input: UpdateUserInput) {
    return this.userService.update(input);
  }

}
