import { Controller, Post, Body, Get, Patch, Delete, Param, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';
import { ROOM_NOT_FOUND } from './room.constants';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Post('create')
    async create(@Body() dto: CreateRoomDto) {
        return this.roomService.create(dto);
    }

    @Delete(':id')
    async delete(@Param() id: string) {
        const deletedRoom = this.roomService.deleteById(id);
        if (!deletedRoom) {
            throw new NotFoundException(ROOM_NOT_FOUND);
        }
    }

    @Get(':id')
    async getById(@Param() id: string) {
        const room = this.roomService.findById(id);
        if (!room) {
            throw new NotFoundException(ROOM_NOT_FOUND);
        }
    }

    @Get()
    async getAll() {
        return this.roomService.findAll;
    }

    @Patch(':id')
    async update(@Param() id: string, @Body() dto: CreateRoomDto) {
        const updateRoom = this.roomService.updateById(id, dto);
        if (!updateRoom) {
            throw new NotFoundException(ROOM_NOT_FOUND);
        }
        return updateRoom;
    }
}
