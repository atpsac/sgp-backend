import { Module } from '@nestjs/common';
import { BusinessPartnersController } from './business-partners.controller';
import { BusinessPartnersService } from './business-partners.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule
  ],
  controllers: [BusinessPartnersController],
  providers: [BusinessPartnersService]
})
export class BusinessPartnersModule {}
