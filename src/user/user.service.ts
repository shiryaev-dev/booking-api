import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel, UserModelDocument } from './user.model';
import { Model } from 'mongoose';
import { ICreateUser } from 'src/auth/types/create-user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {}

    async createUser(dto: ICreateUser): Promise<UserModelDocument> {
        const user = await this.userModel.create(dto);
        return user;
    }

    async getUserByEmail(email: string): Promise<UserModelDocument | null> {
        const user = await this.userModel.findOne({ email }).exec();
        return user;
    }

    async getUserProfile(id: string): Promise<UserModelDocument | null> {
        const user = await this.userModel.findById(id).exec();
        return user;
    }
}
