import { Controller, Get, Put, Param, HttpException, HttpStatus, Post, Body, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Orders } from 'src/entitys/orders.entity';
import { createOrdersDto, updateOrdersDto } from './orders.dto';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { NotFoundResponse } from '../type'; 



@Controller('orders')
export class OrdersController {
    constructor(private readonly OrdersService:OrdersService) {}

    @ApiTags('GET')
    @ApiResponse({status : 200 , description: 'Return a array of orders', type : [Orders]})
    @Get() 
    getAllOrders() : Promise<Orders[]> {
        return this.OrdersService.findAll(); 
    }

    @ApiTags('GET')
    @ApiResponse({status : 200 , description: 'Return a json format order by id', type : Orders})
    @ApiResponse({status : 404 , description: 'Not Found', type : NotFoundResponse})
    @Get(':id')
    async getOrderbyId(@Param('id') id : number) : Promise<Orders> {
       const temp = await this.OrdersService.findOne(id); 
        if ( temp  === undefined) 
        {
            throw new HttpException(`Can not get Order id = ${id}`,HttpStatus.NOT_FOUND); 
        }
        return temp; 
    }

    @ApiTags('POST/PUT')
    @ApiBody({type: createOrdersDto})
    @ApiResponse({status : 200 , description: 'Return a message : "New Order created everything is OK!" and status code'})
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

    @ApiTags('POST/PUT')
    @ApiBody({type: updateOrdersDto})
    @ApiResponse({status : 200 , description: 'Return a message : "Order is updated everything is OK!" and status code'})
    @ApiResponse({status : 404 , description: 'Not Found', type : NotFoundResponse})
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

    @ApiTags('DELETE')
    @ApiResponse({status : 200 , description: 'Return a message : "Order is deleted everything is OK!" and status code'})
    @Delete(':id')
    deleteOrder(@Param('id') id:number) : HttpException {
        this.OrdersService.remove(id); 
        return new HttpException('Order is deleted everything is OK!',HttpStatus.OK);
    }

}