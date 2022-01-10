import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from './user/entities/user.entity';
import {UserModule} from './user/user.module';


@Module({
  imports: [UserModule, GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
  }),
  MongooseModule.forRoot('mongodb+srv://zain9246:G9JVMPYMhQErVbh6@cluster0.32ag5.mongodb.net/nestjs-gql-md'),
MongooseModule.forFeature([{
  name: User.name, schema: UserSchema
}])
],
  controllers: [AppController],
  providers: [AppService],
})

//mongodb://localhost/nestjs-gql-md

export class AppModule {}