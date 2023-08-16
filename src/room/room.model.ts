import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { RoomType } from './room.types';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
export class Room extends Document {
    @Prop()
    number: string;

    @Prop({ enum: RoomType })
    type: RoomType;

    @Prop()
    isDeleted: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
