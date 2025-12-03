import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { AuthModule } from 'src/auth/auth.module';
import { DriversController } from './drivers.controller';

@Module({
  imports: [
    AuthModule,
  ],
  providers: [DriversService],
  controllers: [DriversController],
})
export class DriversModule {}
