import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Products } from 'src/entitys/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],  
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
