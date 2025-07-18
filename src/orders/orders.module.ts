import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/orders.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UserModule } from '../users/user.module';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemsPrintingOption } from './entities/order-item-printiing.option.entity';
import { OrderItemDetails } from './entities/order-item-details';
import { Client } from '../clients/entities/client.entity';
import { ClientEvent } from '../events/entities/clientevent.entity';
import { OrderStatus } from '../orderstatus/entities/orderstatus.entity';
import { Product } from '../products/entities/product.entity';
import { ColorOption } from '../coloroption/_/color-option.entity';
import { PrintingOptions } from '../printingoptions/entities/printingoptions.entity';
import { OrderStatusLogs } from './entities/order-status-log';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
      OrderItemsPrintingOption,
      OrderItemDetails,
      Client,
      ClientEvent,
      OrderStatus,
      OrderStatusLogs,
      Product,
      ColorOption,
      PrintingOptions
    ]),
    UserModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrderModule {}
