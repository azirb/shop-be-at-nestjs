import { Controller, Get, Put, Param, HttpException, HttpStatus, Post, Body, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Orders } from 'src/entitys/orders.entity';
import { createOrdersDto, updateOrdersDto } from './orders.dto';
import { userInfo } from 'os';


@Controller('orders')
export class OrdersController {
    constructor(private readonly OrdersService:OrdersService) {}

    @Get() 
    getAllOrders() : Promise<Orders[]> {
        return this.OrdersService.findAll(); 
    }

    @Get(':id')
    async getOrderbyId(@Param('id') id : number) : Promise<Orders> {
       const temp = this.OrdersService.findOne(id); 
        if ( temp  === undefined) 
        {
            throw new HttpException(`Can not get Order id = ${id}`,HttpStatus.NOT_FOUND); 
        }
        return temp; 
    }

    @Post()
    addOrdertoDB(@Body() createOrdersDto:createOrdersDto) : HttpException {
        const newOrder = new Orders(); 
        newOrder.order= createOrdersDto.order; 
        newOrder.cost=createOrdersDto.cost; 
        newOrder.userid=createOrdersDto.userid; 
        newOrder.address=createOrdersDto.address; 
        this.OrdersService.create(newOrder);
        return new HttpException(`New Order created everything is OK!`,HttpStatus.OK);
         
    }

    @Put(':id') 
    async updateOrderInfo( 
        @Param('id') id : number,
        @Body() {order,cost,status,address} : updateOrdersDto
    ) : Promise<HttpException> {
        const upOrder = await this.OrdersService.findOne(id); 
        if (upOrder === undefined) {
            throw new HttpException(`Can not get Order id = ${id}`,HttpStatus.NOT_FOUND)
        }
        upOrder.order = order; 
        upOrder.status = status; 
        upOrder.cost = cost;
        upOrder.address = address; 
        this.OrdersService.update(upOrder);
        return new HttpException('Order is updated everything is OK!',HttpStatus.OK);
    }

    @Delete(':id')
    deleteOrder(@Param('id') id:number) : HttpException {
        this.OrdersService.remove(id); 
        return new HttpException('Order is deleted everything is OK!',HttpStatus.OK);
    }

}