import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema, Document } from 'mongoose';
import { Room } from 'src/room/room.model';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema({ timestamps: true })
export class Schedule extends Document {
    @Prop()
    date: Date;

    @Prop({ type: MSchema.Types.ObjectId, ref: Room.name })
    roomId: Room;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
