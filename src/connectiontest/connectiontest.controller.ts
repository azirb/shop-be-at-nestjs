import { Controller, Get, Param } from '@nestjs/common';
import {Connection} from 'typeorm';
import { getFileInfo } from 'prettier';

@Controller('connectiontest')
export class ConnectiontestController {
    constructor (private con : Connection){}
    @Get()
    getStatus() : boolean {
        return this.con.isConnected; 
    }
    @Get(':id') 
    getFileInfo(@Param('id') id: string) {
        return this.con.options; 
    }
}
