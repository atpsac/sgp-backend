import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: true, // Allow only this origin
    credentials: true, // Allow cookies to be sent
  });
  //app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
