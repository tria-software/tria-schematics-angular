import { isNil } from "lodash";
import { jwtDecode } from "jwt-decode";

export class UserStorageDTO {
  id: number = 0;
  name: string = "";
  email: string = "";
  token: string = "";
}

export const GetUserName = isNil(localStorage.getItem("user-active-by"))
  ? "UNKNOWN USER"
  : (jwtDecode(localStorage.getItem("user-active-by") ?? "") as any).userName;

export const GetUserProfile = isNil(localStorage.getItem("user-active-by"))
  ? "UNKNOWN PROFILE"
  : (jwtDecode(localStorage.getItem("user-active-by") ?? "") as any).userProfile;

export const GetUserId = isNil(localStorage.getItem("user-active-by"))
  ? 0
  : (jwtDecode(localStorage.getItem("user-active-by") ?? "") as any).userId;
