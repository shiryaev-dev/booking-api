import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Document } from 'mongoose';
import { Room } from '../room/room.model';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema({ timestamps: true })
export class Schedule extends Document {
    @Prop({ required: true })
    dateFrom: Date;

    @Prop({ required: true })
    dateTo: Date;

    @Prop({ type: Types.ObjectId, ref: Room.name, required: true })
    roomId: string;

    @Prop({ default: false })
    isCanceled: boolean;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
