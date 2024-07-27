import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { LoginDTO } from "../model/login-dto";
import * as _ from "lodash";
import { HelpersService } from "src/app/_service/helpers.service";
import { throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  authenticationApi: string = environment.api + "Authentication";
  constructor(private http: HttpClient, private helpers: HelpersService) {}

  login(obj: LoginDTO) {
    const preparedObject = JSON.stringify(obj);
    return this.http
      .post<any>(this.authenticationApi + "/Login", preparedObject, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(
        map((userToken) => {
          if (!_.isNil(userToken)) {
            if (userToken.success) {
              // const user = this.helpers.getDecodedAccessToken(userToken.token);
              // user.token = userToken.token;
              // user.success = true;
              localStorage.setItem("user-active-by", userToken.token);
              return { success: true };
            } else {
              return userToken;
            }
          } else {
            return null;
          }
        })
      );
  }

  logout() {
    localStorage.removeItem("user-active-by");
  }

  changePassword(email: string) {
    const fullUri = this.authenticationApi + "/ChangePassword?email=" + email;

    return this.http
      .post<any>(fullUri, {
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

  updatePassword(change: any) {
    const fullUri = this.authenticationApi + "/UpdatePassword";
    const json = JSON.stringify(change);

    return this.http
      .post<boolean>(fullUri, json, {
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

  verifyLinkChangePassword(hash: string) {
    const fullUri =
      this.authenticationApi + "/VerifyLinkChangePassword?hash=" + hash;

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
