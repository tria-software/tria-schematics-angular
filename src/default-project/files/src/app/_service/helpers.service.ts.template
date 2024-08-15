import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";
const sign = require("jwt-encode");
@Injectable()
export class HelpersService {
  constructor() {}

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  setEncodeModel(obj: any, secret: string): any {
    try {
      return sign(obj, secret);
    } catch (Error) {
      return null;
    }
  }
}
