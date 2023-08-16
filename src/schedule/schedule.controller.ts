import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { SCHEDULE_NOT_FOUND } from './schedule.constants';

@Controller('schedule')
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) {}

    @UsePipes(new ValidationPipe())
    @Post()
    async create(@Body() dto: CreateScheduleDto) {
        return this.scheduleService.create(dto);
    }

    @Get('booking/:id')
    async findBooking(@Param() id: string, dto: { dateFrom: string; dateTo: string }) {
        return this.scheduleService.findBooking(id, dto);
    }

    @Patch(':id')
    async cancel(@Param(':id') id: string) {
        const canceledSchedule = this.scheduleService.cancelBooking(id);

        if (!canceledSchedule) {
            throw new NotFoundException(SCHEDULE_NOT_FOUND);
        }
    }
}
