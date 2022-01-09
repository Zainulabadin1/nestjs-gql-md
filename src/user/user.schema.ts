//Schema for mongodb

import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document{
    @Prop()
    firstName: string

    @Prop()
    lastName: string

    @Prop()
    dob: Date

    @Prop()
    status: string

    @Prop()
    email: string

    @Prop()
    password: string

    @Prop()
    is_block: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);