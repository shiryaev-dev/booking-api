import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { ScheduleDocument, Schedule } from './schedule.model';
import { ICreateSchedule } from './types/create-schedule.interface';
import { IUpdateSchedule } from './types/update-schedule.interface';
import { RoomService } from 'src/room/room.service';

@Injectable()
export class ScheduleService {
    constructor(@InjectModel(Schedule.name) private readonly scheduleModel: Model<ScheduleDocument>, private readonly roomService: RoomService) {}

    async create(createSchedule: ICreateSchedule): Promise<Document<ScheduleDocument>> {
        const { roomId, dateFrom, dateTo } = createSchedule;

        const room = await this.roomService.findById(roomId);
        if (!room) {
            throw new NotFoundException();
        }

        const isBooked = await this.isBooked(roomId, dateFrom, dateTo);

        if (isBooked) {
            throw new ConflictException();
        }

        return this.scheduleModel.create({
            roomId: room._id,
            dateFrom,
            dateTo,
        });
    }

    async findBooking(roomId: string, dto: { dateFrom: string; dateTo: string }): Promise<Document<ScheduleDocument>[]> {
        const { dateFrom, dateTo } = dto;
        return await this.scheduleModel
            .find({ roomId: new Types.ObjectId(roomId) })
            .where({
                $or: [{ dateFrom: { $gte: dateFrom, $lte: dateTo } }, { dateTo: { $gte: dateFrom, $lte: dateTo } }],
            })
            .exec();
    }

    async cancelBooking(reservationId: string): Promise<Document<ScheduleDocument>> {
        return this.scheduleModel.findByIdAndUpdate(reservationId, { isCanceled: true }, { returnDocument: 'after' }).exec();
    }

    async isBooked(roomId: string, startDate: string, endDate: string): Promise<boolean> {
        const result = await this.scheduleModel.findOne().where({
            roomId: new Types.ObjectId(roomId),
            $or: [{ dateFrom: { $gte: startDate, $lte: endDate } }, { dateTo: { $gte: startDate, $lte: endDate } }],
        });
        return result !== null;
    }
}
