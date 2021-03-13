import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column()
  type: string;
  
  @Column({ type : "text"})
  description: string;
  
  @Column()
  price: number;

  @Column()
  count: number;
}