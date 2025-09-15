import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
      healthServerCheck(): void {
            console.log('Server is running...');
      }
}
