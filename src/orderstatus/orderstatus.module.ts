import { Module } from '@nestjs/common';
import { OrderStatusController } from './orderstatus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatus } from './entities/orderstatus.entity';
import { UserModule } from 'src/users/user.module';
import { OrderstatusService } from './orderstatus.service';

@Module({
   imports: [
      TypeOrmModule.forFeature([OrderStatus]),
      UserModule
    ],
  controllers: [OrderStatusController],
  providers: [OrderstatusService],
  
})
export class OrderstatusModule {}
