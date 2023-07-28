import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Document } from 'mongoose';
import { Room } from '../room/room.model';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema({ timestamps: true })
export class Schedule extends Document {
    @Prop()
    date: Date;

    @Prop({ type: Types.ObjectId, ref: Room.name })
    roomId: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
