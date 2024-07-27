import { Routes, RouterModule } from "@angular/router";

// Guards Imports
import { AuthGuard } from "./_guards/auth.guards";

// Pages Imports
import { LoginComponent } from "./pages/login/login.component";
import { UsersComponent } from "./pages/users/users.component";
import { UsersNewEditComponent } from "./pages/users/users-new-edit/users-new-edit.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ProfileNewEditComponent } from "./pages/profile/profile-new-edit/profile-new-edit.component";
import { ForgotPasswordChangeComponent } from "./pages/login/forgot-password-change/forgot-password-change.component";
import { HomeComponent } from "./pages/home/home.component";
import { FirstAccessComponent } from "./pages/first-access/first-access.component";
import { CustomLayoutComponent } from "./pages/custom-layout/custom-layout.component";
import { CustomLayoutNewEditComponent } from "./pages/custom-layout/custom-layout-new-edit/custom-layout-new-edit.component";
import { NovaTelaComponent } from "./pages/nova-tela/nova-tela.component";
import { NovaTelaNewEditComponent } from "./pages/nova-tela/nova-tela-new-edit/nova-tela-new-edit.component";

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "first-access",
    component: FirstAccessComponent,
    canActivate: [AuthGuard],
  },
  { path: "login", component: LoginComponent },
  { path: "users", component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: "users-new",
    component: UsersNewEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "users-edit/:id",
    component: UsersNewEditComponent,
    canActivate: [AuthGuard],
  },
  { path: "profiles", component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: "profiles-new",
    component: ProfileNewEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "profiles-edit/:id",
    component: ProfileNewEditComponent,
    canActivate: [AuthGuard],
  },
  { path: "forgot-password/:hash", component: ForgotPasswordChangeComponent },
];

export const routing = RouterModule.forRoot(routes);
