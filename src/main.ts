import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,                // borra campos desconocidos
      forbidNonWhitelisted: false,    // no lanza error por campos extra
      skipMissingProperties: false,   // exige obligatorios
      transform: true,                // convierte tipos (string → number)
    }),
  );

  //app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
