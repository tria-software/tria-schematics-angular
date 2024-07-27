import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "../service/authentication-service";
import { ActivatedRoute, Router } from "@angular/router";
import { isNil } from "lodash";

@Component({
  selector: "app-forgot-password-change",
  templateUrl: "./forgot-password-change.component.html",
  styleUrls: ["./forgot-password-change.component.scss"],
})
export class ForgotPasswordChangeComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    password: [null, Validators.required],
    confirmpassword: [null, Validators.required],
  });
  sendForm = false;
  loading = false;
  hash: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthenticationService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.verifyValidHash();
  }

  verifyValidHash() {
    this.hash = this.activatedRoute.snapshot.paramMap.get("hash") ?? "";
    this.service.verifyLinkChangePassword(this.hash).subscribe(
      (result) => {
        if (!result.success) {
          this.toastr.error(result.message, "Atenção!");
          this.route.navigate(["/login"]);
        }
      },
      (error) => {
        console.log(error);
        this.toastr.error("Erro ao validar solciitação", "Atenção!");
        this.route.navigate(["/login"]);
      }
    );
  }

  save() {
    if (this.form.valid) {
      if (!this.verifyPassword()) {
        this.toastr.error("As Senhas não são iguais", "Atenção!");
        return;
      }

      this.loading = true;
      this.sendForm = false;

      this.service
        .updatePassword({
          hash: this.hash,
          password: this.form.controls["password"].value,
        })
        .subscribe(
          (result: any) => {
            this.loading = false;
            if (!isNil(result)) {
              this.cancel();
              this.toastr.success("Senha alterada com sucesso!", "Atenção!");
            } else {
              this.loading = false;
              this.toastr.error("Erro ao salvar.", "Atenção!");
            }
          },
          (error: any) => {
            this.loading = false;
            this.toastr.error("Erro ao salvar", "Atenção!");
          }
        );
    } else {
      this.sendForm = true;
      this.toastr.warning("Preencha todos os campos.", "Campos Obrigatórios");
    }
  }

  verifyPassword(): boolean {
    if (
      this.form.controls["password"].value !==
      this.form.controls["confirmpassword"].value
    ) {
      return false;
    }

    return true;
  }

  cancel() {
    this.form.reset();
    this.route.navigate(["/login"]);
  }
}
