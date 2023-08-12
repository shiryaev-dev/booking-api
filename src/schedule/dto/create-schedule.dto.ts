import { IsDateString, IsString, IsBoolean } from 'class-validator';

export class CreateScheduleDto {
    @IsDateString()
    dateFrom: string;

    @IsDateString()
    dateTo: string;

    @IsString()
    roomId: string;

    @IsBoolean()
    isCanceled?: boolean;
}
