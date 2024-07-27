import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, throwError } from 'rxjs';
import { ServiceCrudBase } from 'src/app/_service/service.crud.base';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomLayoutService extends ServiceCrudBase {

  constructor(public override http: HttpClient) {
    super(http);
    this.setEndpoint('Field');
  }
}
