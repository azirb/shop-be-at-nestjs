import { Controller, Get, Post, Param, HttpException, HttpStatus, Body, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from 'src/entitys/products.entity';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { runInThisContext } from 'vm';

/* 
TODO: 
1. Get(One/Many)
2. Post(One/Many)
3. Put
4. Delete
*/

@Controller('products')
export class ProductsController {
    constructor(private readonly ProductsService:ProductsService) {}

    @Get() 
    getAllProducts(): Promise<Products[]> {
        return this.ProductsService.findAll(); 
    }

    @Get(':id')
    async getProductbyId(@Param('id') id: number) : Promise<Products> {
       const temp = await this.ProductsService.findOne(id); 
        if (  temp === undefined) {
            throw new HttpException(`Can not get Product id = ${id}`,HttpStatus.NOT_FOUND); 
        }
        return temp ; 
    }

    @Post() 
    addProducttoDB(@Body() CreateProductDto:CreateProductDto) :HttpException {
        const newProduct = new Products(); 
        newProduct.productName = CreateProductDto.productName; 
        newProduct.type = CreateProductDto.type; 
        newProduct.description = CreateProductDto.description; 
        newProduct.price = CreateProductDto.price; 
        newProduct.count=CreateProductDto.count; 
        this.ProductsService.create(newProduct);
        return new HttpException('Product is created everything is OK!',HttpStatus.OK);
         
    }

    @Put(':id') 
    async updateProductInfo(
        @Param('id') id:number, 
        @Body() {productName,type,description,price,count} : UpdateProductDto
    ) : Promise<HttpException> {
        const upProduct = await this.ProductsService.findOne(id); 
        if (upProduct === undefined) {
            throw new HttpException(`Can not get Product id = ${id}`,HttpStatus.NOT_FOUND); 
        }
        upProduct.productName=productName; 
        upProduct.price=price; 
        upProduct.type = type; 
        upProduct.description= description ; 
        upProduct.count=count; 
        this.ProductsService.update(upProduct); 
        return new HttpException('Product is updated everything is OK!',HttpStatus.OK);
    }

    @Delete(':id')
    productDelete(@Param('id') id:number) : HttpException {
        this.ProductsService.remove(id); 
        return new HttpException('Product is deleted everything is OK!',HttpStatus.OK);
    }

}
