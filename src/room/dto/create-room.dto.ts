import { IsNumber, IsString } from 'class-validator';
import { RoomType } from '../room.types';

export class CreateRoomDto {
    @IsNumber()
    number: number;

    @IsString()
    type: RoomType;
}
