import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { RoomType } from './room.types';
//Документ который возвращается из монго, позволит типизировать-а чтоже потом будет возвращаться
export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
export class Room extends Document {
    @Prop()
    number: string;

    @Prop({ enum: RoomType })
    type: RoomType;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
