import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

import { AuthService } from './auth/auth.service';
import { OperationsModule } from './operations/operations.module';
import { BuyingStationsModule } from './buying-stations/buying-stations.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { BusinessPartnersModule } from './business-partners/business-partners.module';

@Module({
  imports: [
    AuthModule,
    OperationsModule,
    BuyingStationsModule,
    BusinessPartnersModule,
    UsersModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.getOrThrow<string>('POSTGRES_HOST'),
        port: configService.getOrThrow<number>('POSTGRES_PORT'),
        user: configService.getOrThrow<string>('POSTGRES_USER'),
        password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
        database: configService.getOrThrow<string>('POSTGRES_DB'),
      }),
    }),
  ],
  providers: [
    AuthService,
  ],
})
export class AppModule { }