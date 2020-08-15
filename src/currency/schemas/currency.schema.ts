import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Currency extends Document {

    @ApiProperty()
    @Prop(String)
    ValuteID: string;

    @ApiProperty()
    @Prop(Number)
    NumCode: number;

    @ApiProperty()
    @Prop(String)
    CharCode: string;

    @ApiProperty()
    @Prop(Number)
    Nominal: number;

    @ApiProperty()
    @Prop(String)
    Name: string;

    @ApiProperty()
    @Prop(Number)
    Value: number;

}

export const CurrencySchema = SchemaFactory.createForClass(Currency);