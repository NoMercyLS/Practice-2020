import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  AppStart(): string {
    return "Start page\nTo start execute go to <notebook/records/>!";
  }
}
