//Schema for mongodb

import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator')

@Schema()
export class User extends Document{
    @Prop()
    firstName: string

    @Prop()
    lastName: string

    @Prop()
    dob: Date

    @Prop()
    age: number

    @Prop({default : "inactive"})
    status: string

    @Prop({unique : true})
    email: string

    @Prop()
    password: string

    @Prop()
    is_block: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(uniqueValidator)