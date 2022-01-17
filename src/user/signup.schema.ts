//Schema for mongodb

import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Signup extends Document{
   

    @Prop()
    random_string : string

    @Prop()
    user_id : string

    @Prop()
    date_time: Date

   
}

export const SignupSchema = SchemaFactory.createForClass(Signup);
