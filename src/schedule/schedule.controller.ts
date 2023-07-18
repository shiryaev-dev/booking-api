import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { SCHEDULE_NOT_FOUND } from './schedule.constants';

@Controller('schedule')
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) {}

    @Post()
    async create(@Body() dto: CreateScheduleDto) {
        return this.scheduleService.create(dto);
    }

    @Get()
    async getAll() {
        return this.scheduleService.findAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        const schedule = this.scheduleService.findById(id);

        if (!schedule) {
            throw new NotFoundException(SCHEDULE_NOT_FOUND);
        }
        return schedule;
    }

    @Delete(':id')
    async delete(@Param(':id') id: string) {
        const deletedSchedule = this.scheduleService.deleteById(id);

        if (!deletedSchedule) {
            throw new NotFoundException(SCHEDULE_NOT_FOUND);
        }
    }

    @Patch('id')
    async update(@Param(':id') id: string, @Body() dto: CreateScheduleDto) {
        const updatedSchedule = this.scheduleService.updateById(id, dto);

        if (!updatedSchedule) {
            throw new NotFoundException(SCHEDULE_NOT_FOUND);
        }
        return updatedSchedule;
    }
}
