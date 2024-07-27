import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { isNil } from "lodash";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "../service/authentication-service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    email: [null, Validators.required],
  });

  sendForm = false;
  loading: boolean = false;

  @Output()
  backLogin = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthenticationService
  ) {}

  ngOnInit() {}

  save() {
    if (this.form.valid) {
      this.loading = true;
      this.sendForm = false;

      this.service.changePassword(this.form.controls["email"].value).subscribe(
        (result) => {
          this.loading = false;
          if (!isNil(result.success)) {
            this.cancel();
            this.toastr.success(
              "Você receberá um e-mail para a alteração!",
              "Atenção!"
            );
            this.toastr.success("Solicitação enviada com sucesso!", "Atenção!");
          } else {
            this.loading = false;
            this.toastr.error(result.message, "Atenção!");
          }
        },
        (error) => {
          this.loading = false;
          this.toastr.error("Erro ao realizar o processo", "Atenção!");
        }
      );
    } else {
      this.sendForm = true;
      this.toastr.warning("Preencha o e-mail", "Campos Obrigatórios");
    }
  }

  cancel() {
    this.form.reset();
    this.backLogin.emit(true);
  }
}
