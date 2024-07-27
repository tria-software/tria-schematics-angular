export class UserDTO {
  id: number = 0;
  name: string = "";
  lastName: string = "";
  login: string = "";
  email: string = "";
  password: string = "";
  accessAllMultipliers: boolean = false;
  multiplierIds: number[] = [];
  createDate?: Date = undefined;
  profileId: number = 0;
  firstAccess: boolean = false;
}
