import { Controller, Get, Post, Param, HttpException, HttpStatus, Body, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from 'src/entitys/products.entity';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { NotFoundResponse } from '../type'; 

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

    @ApiTags('GET')
    @ApiResponse({status : 200 , description: 'Return a array of products' , type : [Products]})
    @Get() 
    getAllProducts(): Promise<Products[]> {
        return this.ProductsService.findAll(); 
    }

    @ApiTags('GET')
    @ApiResponse({status : 200 , description: 'Return a json format order by id', type : Products})
    @ApiResponse({status : 404 , description: 'Not Found', type : NotFoundResponse})
    @Get(':id')
    async getProductbyId(@Param('id') id: number) : Promise<Products> {
       const temp = await this.ProductsService.findOne(id); 
        if (  temp === undefined) {
            throw new HttpException(`Can not get Product id = ${id}`,HttpStatus.NOT_FOUND); 
        }
        return temp ; 
    }

    @ApiTags('POST/PUT')
    @ApiBody({type: CreateProductDto})
    @ApiResponse({status : 200 , description: 'Return a message : "Product is created everything is OK!" and status code'})
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

    @ApiTags('POST/PUT')
    @ApiBody({type: UpdateProductDto})
    @ApiResponse({status : 200 , description: 'Return a message : "Product is updated everything is OK!" and status code'})
    @ApiResponse({status : 404 , description: 'Not Found', type : NotFoundResponse})
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

    @ApiTags('DELETE')
    @ApiResponse({status : 200 , description: 'Return a message : "Product is deleted everything is OK!" and status code'})
    @Delete(':id')
    productDelete(@Param('id') id:number) : HttpException {
        this.ProductsService.remove(id); 
        return new HttpException('Product is deleted everything is OK!',HttpStatus.OK);
    }

}
