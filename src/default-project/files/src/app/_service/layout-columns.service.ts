import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ServiceCrudBase } from "src/app/_service/service.crud.base";
import { map, catchError, throwError } from "rxjs";
import { LayoutColumnsDTO, ListLayoutColumnsDTO } from "../_dto/layout-columns-dto";

@Injectable({
  providedIn: "root",
})
export class LayoutColumnsService extends ServiceCrudBase {
  constructor(public override http: HttpClient) {
    super(http);
    this.setEndpoint("LayoutColumns");
  }

  getListLayouts(table: string) {
    const fullUri =
      this.urlApi + "/GetAll/" + table;

    return this.http
      .get<ListLayoutColumnsDTO>(fullUri, {
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

  saveLayout(dto: LayoutColumnsDTO) {
    const fullUri =
      this.urlApi + "/Save";

    return this.http
      .post<number>(fullUri, JSON.stringify(dto), {
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

  deleteLayout(id: number) {
    const fullUri = this.urlApi + "/Delete/" + id;

    return this.http
      .delete(fullUri, {
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
