import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { isNil } from "lodash";
import { HelpersService } from "src/app/_service/helpers.service";
import { ChangePasswordModalComponent } from "src/app/components/change-password-modal/change-password-modal.component";
import { UserService } from "../users/service/user.service";

@Component({
  selector: "app-first-access",
  templateUrl: "./first-access.component.html",
  styleUrls: ["./first-access.component.scss"],
})
export class FirstAccessComponent implements OnInit {
  userActive = isNil(localStorage.getItem("user-active-by"))
    ? ""
    : localStorage.getItem("user-active-by");

  userStorage =
    this.userActive == ""
      ? ""
      : this.helpers.getDecodedAccessToken(this.userActive ?? "");

  userid: number = this.userStorage.userId;

  constructor(
    public dialog: MatDialog,
    private helpers: HelpersService,
    private router: Router,
    private service: UserService
  ) {}

  ngOnInit() {
    if (!this.userid) {
      this.userActive = isNil(localStorage.getItem("user-active-by"))
        ? ""
        : localStorage.getItem("user-active-by");

      this.userStorage =
        this.userActive == ""
          ? ""
          : this.helpers.getDecodedAccessToken(this.userActive ?? "");

      this.userid = Number(this.userStorage.userId ?? 0);
    }

    this.getUser();
  }

  getUser() {
    this.service.getById(this.userid ?? 0).subscribe((result: any) => {
      if (result.firstAccess) {
        this.changePassword();
      } else {
        this.router.navigate(["/"]);
      }
    });
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, {
      disableClose: true,
      hasBackdrop: true,
      width: "500px",
      data: { firstAccess: true, userId: this.userid },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(["/"]);
      }
    });
  }
}
