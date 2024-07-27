import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import * as _ from "lodash";
import { AuthenticationService } from "./service/authentication-service";
import { Router } from "@angular/router";
import { LoginDTO } from "./model/login-dto";
import pkg from '../../../../package.json';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    user: ["", Validators.required],
    password: ["", Validators.required],
  });

  sendForm = false;
  loading = false;
  isForgotPassword = false;
  versionapp: string = pkg.version;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    if (this.form.valid) {
      this.sendForm = true;
      this.loading = true;
      const model = this.populeModelToLogin();

      this.service.login(model).subscribe(
        (result: any) => {
          const { success, message } = result;
          this.loading = false;
          if (!_.isNil(result)) {
            if (success) {
              this.router.navigate(["/first-access"]);
            } else {
              this.toastr.error(`${message}`, "Atenção!");
            }
          } else {
            this.toastr.error("Erro ao realizar o login", "Atenção!");
          }
        },
        (error: any) => {
          this.toastr.error("Erro ao realizar o login", "Atenção!");
          console.log(error);
          this.loading = false;
        }
      );
    } else {
      this.sendForm = true;
      this.toastr.error("Preencha todos os campos obrigatórios!", "Atenção!");
    }
  }

  populeModelToLogin(): LoginDTO {
    const model = new LoginDTO();

    model.email = this.form.controls["user"].value;
    model.password = this.form.controls["password"].value;

    return model;
  }

  forgotPassword() {
    this.isForgotPassword = true;
  }

  backLogin() {
    this.isForgotPassword = false;
  }
}
