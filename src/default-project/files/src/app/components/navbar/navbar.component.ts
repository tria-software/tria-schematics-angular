import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import * as _ from "lodash";
import { AuthenticationService } from "src/app/pages/login/service/authentication-service";
import { SideMenuComponent } from "../side-menu/side-menu.component";
import { MatDialog } from "@angular/material/dialog";
import { ChangePasswordModalComponent } from "../change-password-modal/change-password-modal.component";
import { isNil } from "lodash";
import { HelpersService } from "src/app/_service/helpers.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  location: Location;
  mobile_menu_visible: any = 0;

  public isCollapsed = true;
  public dropdownMenu = false;
  public showNotification = false;
  listNotification = [];
  interval: any;
  timeLeft = 60;
  userActive = isNil(localStorage.getItem("user-active-by"))
    ? ""
    : localStorage.getItem("user-active-by");

  userStorage =
    this.userActive == ""
      ? ""
      : this.helpers.getDecodedAccessToken(this.userActive ?? "");

  userName: string = this.userActive == "" ? "" : this.userStorage.userName;
  profile: string = this.userActive == "" ? "" : this.userStorage.userProfile;
  closeResult: string = "";
  isExpand: boolean = false;

  userid: number = this.userStorage.userId;

  @Output()
  expandClick = new EventEmitter();

  @ViewChild(SideMenuComponent, { static: false })
  sideMenuComponent: SideMenuComponent | undefined;

  constructor(
    location: Location,
    private router: Router,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,
    private helpers: HelpersService
  ) {
    this.location = location;
  }

  ngOnInit() { }

  openMenu() {
    this.sideMenuComponent?.changeMenu();
  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }

  toogleDropdown() {
    this.dropdownMenu = !this.dropdownMenu;
  }

  changePassword() {
    this.dialog.open(ChangePasswordModalComponent, {
      disableClose: true,
      hasBackdrop: true,
      width: "500px",
      data: { firstAccess: false, userId: this.userid },
    });
  }
}
