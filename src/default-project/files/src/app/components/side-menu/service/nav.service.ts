import { Injectable } from "@angular/core";
import { NavItem, NavModule } from "./nav-item";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class NavService {
  navModules: NavModule[] = [];

  navItemsRegisters: NavItem[] = [];
  navItemsSecurity: NavItem[] = [];
  navAccessModule: NavModule[] = [];

  constructor() {
    if (this.navItemsRegisters.length === 0) {
      this.getNavModules();
    }
  }

  getNavModules() {
    return (this.navModules = [
      {
        label: 'Cadastros',
        children: this.getNavItemsRegisters(),
      },
      {
        label: "Segurança",
        children: this.getNavItemsSecurity(),
      },
    ]);
  }

  getNavItemsRegisters() {
    return (this.navItemsRegisters = [
      {
        link: "/custom-layout",
        label: "Layout Customizável",
        value: "custom-layout",
      },
      {
        link: "/nova-tela",
        label: "Nova Tela",
        value: "nova-tela",
      },
    ]);
  }

  getNavItemsSecurity() {
    return (this.navItemsSecurity = [
      {
        label: "Configurações",
        value: "security",
        children: [
          {
            link: "/users",
            label: "Usuários",
            value: "users",
          },
          {
            link: "/profiles",
            label: "Perfil",
            value: "profiles",
          },
        ],
      },
    ]);
  }

  verifyPermissionModule(): NavModule[] {
    const token = localStorage.getItem("user-active-by");
    if (token == null) return [];

    const userstorage = token ? (jwtDecode(token) as any) : undefined;
    if (!userstorage) return [];

    const model = userstorage;
    const accessAllModules = model.accessAllModules == "True";

    if (accessAllModules) return this.navModules;
    if (this.navAccessModule.length > 0) return this.navAccessModule;

    const modulesAccess = JSON.parse(model.moduleAccess) as string[];
    this.analyzeNavModuleAccess(this.navModules, modulesAccess);
    return this.navAccessModule;
  }

  isProfileAdmin(): boolean {
    const token = localStorage.getItem("user-active-by");
    if (token == null) return false;

    const userstorage = token ? (jwtDecode(token) as any) : undefined;
    if (!userstorage) return false;

    return userstorage.isProfileAdmin == "True";
  }

  private analyzeNavModuleAccess(
    modules: NavModule[],
    modulesAccess: string[]
  ) {
    modules.forEach((mod) => {
      if (mod.children) {
        this.analyzeNavSubAccess(mod, mod.children, modulesAccess);
      }
    });
  }

  private analyzeNavSubAccess(
    navMod: NavModule,
    subs: NavItem[],
    modulesAccess: string[]
  ) {
    subs.forEach((sub) => {
      if (sub.children) {
        this.analyzeNavAccess(navMod, sub, sub.children, modulesAccess);
      }
    });
  }

  private analyzeNavAccess(
    navMod: NavModule,
    navSub: NavItem,
    navs: NavItem[],
    modulesAccess: string[]
  ) {
    navs.forEach((nav) => {
      modulesAccess.forEach((module: string) => {
        if (nav.value === module) {
          const modExists = this.navAccessModule.find(
            (n) => n.label == navMod.label
          );
          if (modExists) {
            if (!modExists.children) modExists.children = [];

            const subExists = modExists.children.find(
              (x) => x.label === navSub.label
            );
            if (subExists) {
              if (!subExists.children) subExists.children = [];

              subExists.children.push({
                label: navSub.label,
                value: navSub.value,
                children: [navSub],
              });

              modExists.children.push(subExists);
            } else {
              const sub: NavItem = {
                label: navSub.label,
                value: navSub.value,
                children: [nav],
              };

              modExists.children.push(sub);
            }

            this.navAccessModule = [modExists];
          } else {
            const sub: NavItem = {
              label: navSub.label,
              value: navSub.value,
              children: [nav],
            };
            const module: NavModule = { label: navMod.label, children: [sub] };
            this.navAccessModule.push(module);
          }
        }
      });
    });
  }
}
