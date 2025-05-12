import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { setupApp } from '../src/setup-app';

describe('Book (e2e)', () => {
  let app: NestFastifyApplication

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile()

    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
    setupApp(app)
    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('/books (GET)', async () => {
  const response = await app.inject({
    method: 'GET',
    url: '/api/books?page=1&limit=10',
  });
  expect(response.statusCode).toBe(200);
  });

  it('/books/:id (GET)', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/books/1',
    });
    expect(response.statusCode).toBe(200);
  });

  it('/genres (GET)', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/genres',
    });
    expect(response.statusCode).toBe(200);
  });
});
