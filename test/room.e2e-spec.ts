import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateRoomDto } from '../src/room/dto/create-room.dto';
import { RoomType } from '../src/room/room.types';
import { Types, disconnect } from 'mongoose';
import { ROOM_NOT_FOUND } from '../src/room/room.constants';

const testDto: CreateRoomDto = {
    number: 18,
    type: RoomType.DELUXE,
};

const roomNotFound = {
    statusCode: 404,
    message: ROOM_NOT_FOUND,
};

describe('RoomController (e2e)', () => {
    let app: INestApplication;
    let createdId: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/room/create (POST) - success', async () => {
        return request(app.getHttpServer())
            .post('/room/create')
            .send(testDto)
            .expect(201)
            .then(({ body }: request.Response) => {
                createdId = body._id;
                expect(createdId).toBeDefined();
            });
    });

    it('/room/create (POST) - fail', () => {
        return request(app.getHttpServer())
            .post('/room/create')
            .send({ ...testDto, number: 'double' })
            .expect(400);
    });

    it('/room (GET ALL) - success', async () => {
        return request(app.getHttpServer())
            .get('/room')
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.length).toBeGreaterThan(0);
            });
    });

    it('/room/:id (GET) - success', async () => {
        return request(app.getHttpServer())
            .get('/room/' + createdId)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body).toBe(1);
            });
    });

    it('/room/:id (GET) - fail', () => {
        return request(app.getHttpServer())
            .get('/room/' + new Types.ObjectId().toHexString())
            .expect(404, roomNotFound);
    });

    it('/room/:id (PATCH) - success', () => {
        return request(app.getHttpServer())
            .patch('/room/' + createdId)
            .send({ ...testDto, type: RoomType.FAMILY })
            .expect(200);
    });

    it('/room/:id (PATCH) - fail', () => {
        return request(app.getHttpServer())
            .patch('/room/' + createdId)
            .send({ ...testDto, type: 'super' })
            .expect(400);
    });

    it('/room/:id (DELETE) - success', () => {
        return request(app.getHttpServer())
            .delete('/room/' + createdId)
            .expect(200);
    });

    it('/room/:id (DELETE) - fail', () => {
        return request(app.getHttpServer())
            .delete('/room/' + new Types.ObjectId().toHexString())
            .expect(404, roomNotFound);
    });

    afterAll(() => {
        disconnect();
    });
});
