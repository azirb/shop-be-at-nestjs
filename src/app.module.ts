import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ConnectiontestModule } from './connectiontest/connectiontest.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql11.freemysqlhosting.net',
      port: 3306,
      username: 'sql11398572',
      password: 'fTp8vtVCAf',
      database: 'sql11398572',
      entities: [],
      synchronize: true,
    }),
    ConnectiontestModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}