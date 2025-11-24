import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsController } from './operations.controller';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    AuthModule
  ],
  controllers: [OperationsController],
  providers: [OperationsService],
})
export class OperationsModule {}