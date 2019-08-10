import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppBasicService } from './app-basic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public title = 'error-handler';
  public errorObj: object;

  constructor(
    private http: HttpClient,
    private appBasicService: AppBasicService
  ) {}

  ngOnInit() {
    this.getErrorUrl();

    this.appBasicService.errorObjEmitter.subscribe( err => {
      this.errorObj = err;
    });
  }

  getErrorUrl(): void {
    this.http.get('test').subscribe( data => {
      console.log(data);
    });
  }
}
