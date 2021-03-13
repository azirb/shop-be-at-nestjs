import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ConnectiontestModule } from './connectiontest/connectiontest.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { User } from './entitys/user.entity';
import { Products } from './entitys/products.entity';
import { Orders } from './entitys/orders.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "sql11.freemysqlhosting.net",
      port: 3306,
      username: "sql11398572",
      password: "fTp8vtVCAf",
      database: "sql11398572",
      entities: [User,Products,Orders],
      synchronize: true
    }),
    ConnectiontestModule, 
    UsersModule,
    ProductsModule, 
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}