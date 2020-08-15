import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User extends Document {

    @ApiProperty()
    @Prop(String)
    token: string;

}

export const UserSchema = SchemaFactory.createForClass(User);