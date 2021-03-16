import {ApiProperty} from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Products {
  @ApiProperty({required : false  , description: 'Auto generated id'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({required : true  , description: 'Product name'})
  @Column()
  productName: string;

  @ApiProperty({required : true , type : 'text', description: 'Product type for selectors and sort'})
  @Column()
  type: string;
  
  @ApiProperty({required : true , description: 'Short product description that show in shop'})
  @Column({ type : "text"})
  description: string;
  
  @ApiProperty({required : true , description: 'Product price'})
  @Column()
  price: number;

  @ApiProperty({required : true , description: 'Product count on storage'})
  @Column()
  count: number;
}