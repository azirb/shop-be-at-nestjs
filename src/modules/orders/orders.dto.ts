export class createOrdersDto {
    userid: number;
    order : string []; 
    cost : number ; 
    address:string; 
}


export class updateOrdersDto {
    order : string []; 
    cost : number ; 
    status : boolean;
    address: string ; 
}