import { ErrorHandler, Injectable, Injector, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorsService } from './errors.service';
import { AppBasicService } from './app-basic.service';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(
    private injector: Injector,
    private appBasicService: AppBasicService
  ) {}

  handleError(error: Error | HttpErrorResponse) {
    const errorsService = this.injector.get(ErrorsService);
    if (error instanceof HttpErrorResponse) {
      //  server or connection errors happened
      console.warn('It happens on network', error);
    } else {
      // Handle client Error
      console.warn('Angular Error, ReferenceError', error);
    }
    errorsService.log(error).subscribe( errorObj => {
      this.appBasicService.setErrorObject(errorObj);
    });
  }
}
