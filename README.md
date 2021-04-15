
# Installation
To BE start working u need to download it, unpackage in empty folder, open folder in VSC.  
Next type 'npm i' command to install all depences.   
After this type 'nest start --watch'   
Next open http://localhost:3000/connectiontest in browser to check DB connection if it's fine u can use BackEnd http  
  
# API requests   
GET :   
http://localhost:3000/users - All Users   
http://localhost:3000/users/1 - User with id 1   
  
http://localhost:3000/orders - All Orders   
http://localhost:3000/orders/1 - Order with  id 1   
  
http://localhost:3000/products - All Products   
http://localhost:3000/products/1 - Products with  id 1   
  
POST/PUT :  
http://localhost:3000/users - Create Users   
http://localhost:3000/users/1 - update User with id 1   
  
http://localhost:3000/orders - Create Order   
http://localhost:3000/orders/1 - update Order with id 1   
  
http://localhost:3000/products - Create Produc   
http://localhost:3000/products/1 - update Products with id 1   
  
DELETE :   
http://localhost:3000/users/1 - delete User with id 1   
  
http://localhost:3000/orders/1 - delete Order with id 1   
  
http://localhost:3000/products/1 -delete Products with id 1   
  
If POST/PUT/DELETE was succsesful server wiil return 200 and message about it  
  
# Tables structure   

```json 
Users {  
    "id": 1,
    "firstName": "Ivan",
    "lastName": "Sergeev",
    "phone": "+78919978802",
    "email": "Ivan@rambler.su",
    "purchasesSum": 4456,
    "sex": true,
    "bithDate": "2021-01-02T21:00:00.000Z",
    "password": "qwerty",
    "isActive": true,
    "role": "user"
},
Products{
    "id": 1,
    "productName": "iPhone",
    "type": "SmartPhone",
    "description": "Phone that u deserve",
    "price": 50000,
    "count": 10
},
Orders{
    "id": 1,
    "userid": 2,
    "order": [
        "iPhone",
        " Motherboard"
    ],
    "cost": 58000,
    "status": false,
    "address": "Lenina street  45"
}
```
