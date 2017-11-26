import { Injectable } from '@angular/core';

@Injectable()
export class Player {
  params?: any;
  headers?: Headers;
  path?: string;
  constructor(values: Object = {}) {
     Object.assign(this, values);
   }
}
