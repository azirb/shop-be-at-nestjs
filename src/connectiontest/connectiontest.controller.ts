import { Controller, Get } from '@nestjs/common';
import {Connection} from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@Controller('connectiontest')
export class ConnectiontestController {
    constructor (private con : Connection){}
    @ApiTags('Test a connection to db!')
    @Get()
    getStatus() : boolean {
        return this.con.isConnected; 
    }
    @ApiTags('Test a connection to db!')
    @Get() 
    getInfo() {
        return this.con.options; 
    }
}
