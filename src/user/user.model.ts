import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { UserRole } from './user.types';

export type UserModelDocument = HydratedDocument<UserModel>;

@Schema({ timestamps: true })
export class UserModel extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    passwordHash: string;

    @Prop({ enum: UserRole, required: true, default: UserRole.USER })
    role: UserRole;

    @Prop({ required: true })
    phone: string;
}

export const UserModelSchema = SchemaFactory.createForClass(UserModel);
