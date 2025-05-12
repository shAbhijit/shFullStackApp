import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { setupApp } from './setup-app';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyCors from '@fastify/cors';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
      { bufferLogs: true },
    );
    const configService = app.get(ConfigService);

    setupApp(app);

    // Configure CORS for Fastify
    await app.register(fastifyCors, {});

    const documentBuilder = new DocumentBuilder()
      .setTitle('Book Store API')
      .setDescription('API documentation for the Book Store application')
      .setVersion(configService.get<string>('APP_VERSION', '0.0.1-local'))
      .setContact('Developer', '', 'abhijagtap73@gmail.com')
      .addBearerAuth()
      .addServer('http://localhost:3001', 'Development');

    if (configService.get('NODE_ENV') === 'local') {
      documentBuilder.addServer(
        `http://localhost:${configService.get('BACKEND_API_PORT', 3001)}`,
        'Local',
      );
    }

    const document = SwaggerModule.createDocument(app as any, documentBuilder.build());
    SwaggerModule.setup('openapi', app as any, document);

    const apiPort = configService.get<number>('API_PORT', 3001);
    await app.listen(apiPort, '0.0.0.0');
  } catch (err) {
    console.error('Error starting the application:', err);
  }
}

bootstrap();
