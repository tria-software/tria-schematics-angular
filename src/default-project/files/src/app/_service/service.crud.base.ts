import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { ServiceBase } from "./service.base";
import { environment } from "src/environments/environment";
import { throwError } from "rxjs";

export abstract class ServiceCrudBase extends ServiceBase {
  public urlApi: string = "";
  public serviceInUse: string = '';

  constructor(public http: HttpClient) {
    super();
  }

  public setEndpoint(endpoint: string) {
    this.urlApi = `${environment.api}${endpoint}`;
    this.serviceInUse = endpoint;
  }

  public add(obj: any): any {
    const fullUri = this.urlApi + "/Save";

    return this.http
      .post(fullUri, JSON.stringify(obj), this.getHeaderJson())
      .pipe(
        map((rawList) => {
          return rawList;
        }),
        catchError(this.serviceError)
      );
  }

  public update(obj: any): any {
    const fullUri = this.urlApi + "/Update";

    return this.http
      .patch(fullUri, JSON.stringify(obj), this.getHeaderJson())
      .pipe(
        map((rawList) => {
          return rawList;
        }),
        catchError(this.serviceError)
      );
  }

  public delete(id: number) {
    const url = `${this.urlApi}/delete?Id=${id}`;
    return this.http.delete<any>(url).pipe(
      map((result) => {
        return result;
      }),
      catchError(this.serviceError)
    );
  }

  public activateDisable(id: number) {
    const url = `${this.urlApi}/activateDisable`;

    return this.http.patch<any>(url, { id: id }).pipe(
      map((result) => {
        return result;
      }),
      catchError(this.serviceError)
    );
  }

  public getById(id: number): any {
    const url = `${this.urlApi}/GetById?Id=${id}`;

    return this.http.get(url, this.getHeaderJson()).pipe(
      map((rawList) => {
        return rawList;
      }),
      catchError(this.serviceError)
    );
  }

  public getAll(filter: any): any {
    const fullUri = this.urlApi + "/GetAll";

    return this.http
      .post<any>(fullUri, JSON.stringify(filter), this.getHeaderJson())
      .pipe(
        map((result) => {
          return result;
        }),
        catchError(error => {
          return error;
        })
      );
  }

  public exportExcel(objFilter: any, nameFile: string = "Planilha") {
    const fullUri = this.urlApi + "/Export2Excel";
    const preparedObject = JSON.stringify(objFilter);
    return this.http
      .post(fullUri, preparedObject, {
        observe: "response",
        responseType: "blob",
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(
        map((response) => {
          return {
            data: response.body,
            filename: `${nameFile}.xlsx`,
          };
        }),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }
}
