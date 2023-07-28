import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateScheduleDto } from '../src/schedule/dto/create-schedule.dto';
import { Types } from 'mongoose';
import { SCHEDULE_NOT_FOUND } from '../src/schedule/schedule.constants';

const testDto: CreateScheduleDto = {
    roomId: new Types.ObjectId().toHexString(),
    date: new Date(),
};

const scheduleNotFound = {
    statusCode: 404,
    message: SCHEDULE_NOT_FOUND,
};

describe('ScheduleController (e2e)', () => {
    let app: INestApplication;
    let createdId: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/schedule/create (POST) - success', async done => {
        return request(app.getHttpServer())
            .post('/schedule/create')
            .send(testDto)
            .expect(201)
            .then(({ body }: request.Response) => {
                createdId = body._id;
                expect(createdId).toBeDefined();
                done();
            });
    });

    it('/schedule/create (POST) - fail', async done => {
        return request(app.getHttpServer())
            .post('/schedule/create')
            .send({ ...testDto, roomId: '20' })
            .expect(400)
            .then(({ body }: request.Response) => {
                done();
            });
    });

    it('/schedule (GET ALL) - success', async done => {
        return request(app.getHttpServer())
            .get('/schedule')
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.length).toBeGreaterThan(0);
                done();
            });
    });

    it('/schedule/:id (GET) - success', () => {
        return request(app.getHttpServer())
            .get('/schedule/' + createdId)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body).toBeDefined();
            });
    });

    it('/schedule/:id (GET) - fail', () => {
        return request(app.getHttpServer())
            .get('/schedule/' + new Types.ObjectId().toHexString())
            .expect(404, scheduleNotFound);
    });

    it('/schedule/:id (PATCH) - success', () => {
        return request(app.getHttpServer())
            .patch('/schedule/' + createdId)
            .send({ ...testDto, date: new Date() })
            .expect(200);
    });

    it('/schedule/:id (PATCH) - fail', () => {
        return request(app.getHttpServer())
            .patch('/schedule/' + createdId)
            .send({ ...testDto, room: 10 })
            .expect(400);
    });

    it('/schedule/:id (DELETE) - success', () => {
        return request(app.getHttpServer())
            .delete('/schedule/' + createdId)
            .expect(200);
    });

    it('/schedule/:id (DELETE) - fail', () => {
        return request(app.getHttpServer())
            .delete('/schedule/' + new Types.ObjectId().toHexString())
            .expect(404, scheduleNotFound);
    });
});
