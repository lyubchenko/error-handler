import { Injectable, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

import { Observable, of } from 'rxjs';

@Injectable()
export class ErrorsService {
  constructor(
    private injector: Injector,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  log(error): Observable<object> {
    const errorToSend: object = this.addContextInfo(error);
    // send for url or return Observable
    return of(errorToSend);
  }

  addContextInfo(error: Error | HttpErrorResponse): object {
    const isProduction: boolean = environment.production;
    const name: string = error.name || null;
    const time = new Date().getTime();
    const location = this.injector.get(LocationStrategy);
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const status = (error && error['rejection']) ? error['rejection'].status : error['status'] || null;
    const urlApi = (error && error['rejection']) ? error['rejection'].url : error['url'] || null;
    const message = error.message || error.toString();
    let userDevice;
    if (isPlatformBrowser(this.platformId)) {
      userDevice = {
        'appVersion': window.navigator.appVersion,
        'userAgent': window.navigator.userAgent,
      };
    } else {
      userDevice = 'server';
    }
    const stack = error['stack'] || null;
    const errorObj: object = {
      isProduction,
      name,
      time,
      url,
      status,
      urlApi,
      message,
      userDevice,
      stack
    };
    return errorObj;
  }
}
