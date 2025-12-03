import { Module } from '@nestjs/common';
import { CarriersService } from './carriers.service';
import { CarriersController } from './carriers.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule
  ],
  providers: [CarriersService],
  controllers: [CarriersController]
})
export class CarriersModule {}
