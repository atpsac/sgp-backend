import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:4200',           // Desarrollo local
      'https://amazonastrading.latamtic.com', // Producción
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers',
    ],
    exposedHeaders: [
      'Authorization',
      'Access-Token',
      'Refresh-Token',
    ],
    credentials: true, // Allow cookies to be sent
  });
  //app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
