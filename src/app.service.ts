import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  appStart(): string {
    return "Start page\nTo start execute go to <notebook/records/>!";
  }
}
