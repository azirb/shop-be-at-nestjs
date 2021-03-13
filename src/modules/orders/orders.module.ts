import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from 'src/entitys/orders.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Orders])],  
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
