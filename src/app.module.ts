import { Module } from '@nestjs/common';
import { ScheduleModule } from './schedule/schedule.module';
import { RoomModule } from './room/room.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { getMongoConfig } from './configs/mongo.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({ imports: [ConfigModule], inject: [ConfigService], useFactory: getMongoConfig }),
        ScheduleModule,
        RoomModule,
        UserModule,
        AuthModule,
        FilesModule,
    ],
})
export class AppModule {}
