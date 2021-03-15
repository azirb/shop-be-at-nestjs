import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entitys/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor (
        @InjectRepository(Products)
        private readonly productsRepository : Repository<Products>
    ) {}

    findAll() : Promise<Products[]> {
        return this.productsRepository.find(); 
    }

    findOne(id:number) : Promise<Products> {
        return this.productsRepository.findOne(id); 
    }

    async remove(id:number) : Promise<void> {
        await this.productsRepository.delete(id); 
    }

    create(Product : Products) : Promise<Products> {
        delete Product.id; 
        return  this.productsRepository.save(Product);  
    }

    update(Product : Products) : Promise<Products> {
        return this.productsRepository.save(Product); 
    }

}
