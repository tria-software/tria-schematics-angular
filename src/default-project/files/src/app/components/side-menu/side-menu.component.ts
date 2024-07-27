import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NavService } from "./service/nav.service";
import { GetUserName, GetUserProfile } from "src/app/_models/user-storage-dto";

@Component({
  selector: "app-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.scss"],
})
export class SideMenuComponent implements OnInit {
  isMenuActive = false;
  navModules: any;
  isMod: boolean = false;

  constructor(private navItem: NavService) {}

  ngOnInit() {
    this.navModules = this.navItem.getNavModules();
    this.navModules = this.navItem.verifyPermissionModule();
  }

  changeMenu(issuccess: boolean = false) {
    this.isMenuActive = !this.isMenuActive;
  }
}
