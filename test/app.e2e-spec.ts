import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/api (GET)', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const httpServer = app.getHttpServer();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return request(httpServer)
      .get('/api')
      .expect(200)
      .expect((res: request.Response) => {
        expect(res.body).toHaveProperty('status');
      });
  });
});
