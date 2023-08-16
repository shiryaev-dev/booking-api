import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from './room.model';
import { Model, Document } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { ICreateRoom } from './types/create-room.interface';
import { IUpdateRoom } from './types/update-room.interface';

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
}
