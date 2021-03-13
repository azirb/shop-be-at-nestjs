import { Controller, Get, Param } from '@nestjs/common';
import {Connection} from 'typeorm';

@Controller('connectiontest')
export class ConnectiontestController {
    constructor (private con : Connection){}
    @Get()
    getStatus() : boolean {
        return this.con.isConnected; 
    }
    @Get() 
    getInfo() {
        return this.con.options; 
    }
}
