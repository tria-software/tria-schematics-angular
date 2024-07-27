import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ServiceCrudBase } from "src/app/_service/service.crud.base";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CepService extends ServiceCrudBase {
  constructor(public override http: HttpClient) {
    super(http);
    this.setEndpoint("cep");
  }

  getCep(cep: string): any {
    const fullUri = `${this.urlApi}?zipcode=${cep}`;
    return this.http
      .get<any>(fullUri, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(
        map((result) => {
          return result;
        }),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }
}
