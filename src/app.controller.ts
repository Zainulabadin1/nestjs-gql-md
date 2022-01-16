import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user/user.schema';
import { Signup } from './user/signup.schema';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('/user/:id')
  // updateUser(@Param('id') id : string): Promise<User>{
  //   return this.appService.updateUserStatus(id);
  // }

  @Get('/user/:id')
  updateUser(@Param('id') id : string){
    return this.appService.updateUserStatus(id);
  }

}
