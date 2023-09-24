import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from './room.model';
import { Model, Document } from 'mongoose';
import { ICreateRoom } from './types/create-room.interface';
import { IUpdateRoom } from './types/update-room.interface';
import { Schedule } from 'src/schedule/schedule.model';

@Injectable()
export class RoomService {
    constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

    async create(createRoom: ICreateRoom): Promise<Document<RoomDocument>> {
        return this.roomModel.create(createRoom);
    }

    async findById(id: string): Promise<Document<RoomDocument>> {
        return this.roomModel.findById(id).exec();
    }

    async findAll(): Promise<Document<RoomDocument>[]> {
        return this.roomModel.find().exec();
    }

    async deleteById(id: string): Promise<Document<RoomDocument> | null> {
        return this.roomModel.findByIdAndUpdate(id, { isDeleted: true }, { returnDocument: 'after' }).exec();
    }

    async updateById(id: string, updateRoom: IUpdateRoom): Promise<Document<RoomDocument>> {
        return this.roomModel.findByIdAndUpdate(id, updateRoom, { returnDocument: 'after' }).exec();
    }

    async getStatisticsByMonth(month: string): Promise<(Room & { schedules: Schedule[]; schedulesCount: number })[]> {
        const mo = new Date(month);
        const startDate = new Date(mo.getFullYear(), mo.getMonth(), 1);
        const endDate = new Date(mo.getFullYear(), mo.getMonth() + 1, 1);
        return this.roomModel
            .aggregate([
                {
                    $sort: {
                        _id: 1,
                    },
                },
                {
                    $lookup: {
                        from: 'schedulemodels',
                        localField: '_id',
                        foreignField: 'room',
                        as: 'schedules',
                        pipeline: [
                            {
                                $match: {
                                    day: { $gte: startDate, $lt: endDate },
                                },
                            },
                        ],
                    },
                },
                {
                    $addFields: {
                        schedulesCount: { $size: '$schedules' },
                    },
                },
            ])
            .exec() as Promise<(Room & { schedules: Schedule[]; schedulesCount: number })[]>;
    }
}
