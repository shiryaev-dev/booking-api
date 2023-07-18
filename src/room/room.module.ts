import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './room.model';
import { RoomController } from './room.controller';

@Module({
    providers: [RoomService],
    imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])],
    controllers: [RoomController],
})
export class RoomModule {}
