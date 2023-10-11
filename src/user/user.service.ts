import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel, UserModelDocument } from './user.model';
import { Model } from 'mongoose';
import { ICreateUser } from '../auth/types/create-user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {}

    async createUser(dto: ICreateUser): Promise<UserModelDocument> {
        return this.userModel.create(dto);
    }

    async getUserByEmail(email: string): Promise<UserModelDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async getUserProfile(id: string): Promise<UserModelDocument | null> {
        return this.userModel.findById(id).exec();
    }
}
