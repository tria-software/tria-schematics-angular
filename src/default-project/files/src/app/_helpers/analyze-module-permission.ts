import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NavService } from "../components/side-menu/service/nav.service";
import { NavItem, NavModule } from "../components/side-menu/service/nav-item";

@Injectable()
export class AnalyzeModulePermission {
  access: boolean = false;

  constructor(
    private nav: NavService,
    private toastr: ToastrService,
    public router: Router
  ) {}

  haveAccessModule(moduleAccess: string): boolean {
    this.access = false;
    const permissionAccess = this.nav.verifyPermissionModule();
    this.analyzeNavModuleAccess(permissionAccess, moduleAccess);
    if (!this.access) {
      this.toastr.error(
        "Você não tem permissão para acessar essa tela!",
        "Atenção!"
      );
      this.router.navigate(["/home"]);
      return false;
    }

    return true;
  }

  isProfileAdmin() {
    return this.nav.isProfileAdmin();
  }

  private analyzeNavModuleAccess(mods: NavModule[], moduleAccess: string) {
    mods.forEach((mod) => {
      this.analyzeNavAccess(mod.children, moduleAccess);
    });
  }

  private analyzeNavAccess(navs: NavItem[], moduleAccess: string) {
    navs.forEach((nav) => {
      if (nav.children) {
        this.analyzeNavAccess(nav.children, moduleAccess);
      } else {
        if (nav.value === moduleAccess) {
          this.access = true;
        }
      }
    });
  }
}
