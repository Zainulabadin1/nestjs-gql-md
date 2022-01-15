import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user/user.schema';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get('/user/:id')
  updateUser(@Param('id') id : string): Promise<User>{
    return this.appService.updateUserStatus(id);
  }

  

}
