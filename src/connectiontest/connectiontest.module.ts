import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'; 
import { Connection } from 'typeorm';
import { ConnectiontestController } from './connectiontest.controller';

@Module({
    imports:[TypeOrmModule.forFeature()],
    controllers: [ConnectiontestController],
    providers: [],
})
export class ConnectiontestModule {}
