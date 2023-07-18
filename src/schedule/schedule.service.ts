import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { ScheduleDocument, Schedule } from './schedule.model';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {
    constructor(@InjectModel(Schedule.name) private readonly scheduleModel: Model<ScheduleDocument>) {}

    async create(dto: CreateScheduleDto): Promise<Document<ScheduleDocument>> {
        return this.scheduleModel.create(dto);
    }

    async deleteById(id: string): Promise<Document<ScheduleDocument>> {
        return this.scheduleModel.findByIdAndDelete(id).exec();
    }

    async findById(id: string): Promise<Document<ScheduleDocument>> {
        return this.scheduleModel.findById(id).exec();
    }

    async findAll(): Promise<Document<ScheduleDocument>[]> {
        return this.scheduleModel.find().exec();
    }

    async updateById(id: string, dto: CreateScheduleDto): Promise<Document<ScheduleDocument>> {
        return this.scheduleModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }
}
