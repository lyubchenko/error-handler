import { Injectable, EventEmitter } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppBasicService {
  public errorObjEmitter = new Subject<object>();

  constructor() { }

  setErrorObject(err: object): void {
    this.errorObjEmitter.next(err);
  }
}
