import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class AppService {
  getHello():string{
    return 'HelloWorld!';
  }
}
