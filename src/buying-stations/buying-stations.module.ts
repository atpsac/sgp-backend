import { Module } from '@nestjs/common';
import { BuyingStationsService } from './buying-stations.service';
import { BuyingStationsController } from './buying-stations.controller';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    AuthModule
  ],
  controllers: [BuyingStationsController],
  providers: [BuyingStationsService],
})
export class BuyingStationsModule {}