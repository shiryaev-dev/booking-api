import { Controller, Post, Body, Get, Patch, Delete, Param, NotFoundException, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';
import { ROOM_NOT_FOUND } from './room.constants';
import { Roles } from 'src/common/decorators/roles.decorators';
import { UserRole } from 'src/user/user.types';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @UsePipes(new ValidationPipe())
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesGuard)
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
        return room;
    }

    @Get()
    async getAll() {
        return this.roomService.findAll();
    }

    @UsePipes(new ValidationPipe())
    @Patch(':id')
    async update(@Param() id: string, @Body() dto: CreateRoomDto) {
        const updateRoom = this.roomService.updateById(id, dto);
        if (!updateRoom) {
            throw new NotFoundException(ROOM_NOT_FOUND);
        }
        return updateRoom;
    }

    @Get('statistics/:month')
	async getStatisticsByMonth(@Param('month') month: string) {
		return await this.roomService.getStatisticsByMonth(month);
	}
}
