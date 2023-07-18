import { Module } from '@nestjs/common';
import { ScheduleModule } from './schedule/schedule.module';
import { RoomModule } from './room/room.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { getMongoConfig } from './configs/mongo.config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({ imports: [ConfigModule], inject: [ConfigService], useFactory: getMongoConfig }),
        ScheduleModule,
        RoomModule,
    ],
})
export class AppModule {}
