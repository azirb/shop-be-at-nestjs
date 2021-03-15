import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';



@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userid : number; 

  @Column("simple-array")
  order : string[]; 

  @Column("double")
  cost : number; 

  @Column({default: false})
  status : boolean; 
  
  @Column()
  address: string; 
}