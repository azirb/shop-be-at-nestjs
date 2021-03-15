import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/entitys/orders.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
    constructor (
        @InjectRepository(Orders)
        private readonly ordersRepository : Repository<Orders>
    ) {}

    findAll() : Promise<Orders[]> {
        return this.ordersRepository.find(); 
    }

    findOne(id : number) : Promise<Orders> {
        return this.ordersRepository.findOne(id);
    }

    async remove(id: number) : Promise<void> {
        await this.ordersRepository.delete(id);
    }

    create(Order : Orders) : Promise <Orders> {
        delete Order.id ; 
        return this.ordersRepository.save(Order); 
    }

    update(Order:Orders) : Promise <Orders> {
        return this.ordersRepository.save(Order); 
    }
}
