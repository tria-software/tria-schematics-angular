import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServiceCrudBase } from "src/app/_service/service.crud.base";

@Injectable({
  providedIn: "root",
})
export class ProfileService extends ServiceCrudBase {

  constructor(public override http: HttpClient) {
    super(http);
    this.setEndpoint("profile");
  }
}
