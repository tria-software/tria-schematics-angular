import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ServiceCrudBase } from "src/app/_service/service.crud.base";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService extends ServiceCrudBase {
  urlProfile: string = environment.api + "profile";

  constructor(public override http: HttpClient) {
    super(http);
    this.setEndpoint("user");
  }

  getAllProfiles() {
    const fullUri = this.urlProfile + "/GetAll";
    return this.http
      .post<any>(
        fullUri,
        { pageIndex: 0, pageSize: undefined, status: true },
        this.getHeaderJson()
      )
      .pipe(
        map((result) => {
          return result;
        }),
        catchError(this.serviceError)
      );
  }

  verifyExistsEmail(email: string, id?: number) {
    const fullUri =
      this.urlApi + `/VerifyExistsEmail?email=${email}&id=${id ? id : ""}`;

    return this.http.get<boolean>(fullUri, this.getHeaderJson()).pipe(
      map((result) => {
        return result;
      }),
      catchError(this.serviceError)
    );
  }

  updatePassword(change: any) {
    const fullUri = this.urlApi + "/UpdatePassword";
    const preparedObject = JSON.stringify(change);

    return this.http
      .post<boolean>(fullUri, preparedObject, this.getHeaderJson())
      .pipe(
        map((result) => {
          return result;
        }),
        catchError(this.serviceError)
      );
  }
}
