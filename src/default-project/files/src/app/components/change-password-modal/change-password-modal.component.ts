import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/pages/users/service/user.service";
import { GetUserId } from "src/app/_models/user-storage-dto";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-change-password-modal",
  templateUrl: "./change-password-modal.component.html",
  styleUrls: ["./change-password-modal.component.scss"],
})
export class ChangePasswordModalComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    oldpassword: [null, Validators.required],
    password: [null, Validators.required],
    confirmpassword: [null, Validators.required],
  });

  sendForm = false;
  post = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ChangePasswordModalComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: UserService
  ) {}

  ngOnInit() {
    if (this.data.firstAccess) {
      this.form.controls["oldpassword"].clearValidators();
      this.form.controls["oldpassword"].updateValueAndValidity();
    }
  }

  save() {
    if (this.form.valid) {
      if (!this.verifyPassword()) {
        this.toastr.error("As Senhas não são iguais", "Atenção!");
        return;
      }

      this.sendForm = false;
      this.post = true;
      this.service
        .updatePassword({
          userId: Number(this.data.userId),
          password: this.form.controls["password"].value,
          oldpassword: this.data.firstAccess
            ? undefined
            : this.form.controls["oldpassword"].value,
          isFirstAccess: this.data.firstAccess,
        })
        .subscribe(
          (result: any) => {
            if (result) {
              this.form.reset();
              this.dialogRef.close(true);
              this.toastr.success("Senha alterada com sucesso", "Atenção!");
            } else {
              this.post = false;
              this.toastr.error("A senha atual não está correta", "Atenção!");
            }
          },
          (error: any) => {
            this.post = false;
            this.toastr.error("Erro ao salvar", "Atenção!");
          }
        );
    } else {
      this.sendForm = true;
      this.post = false;
      this.toastr.warning(
        "Preencha todos os campos obrigatórios",
        "Campos Obrigatórios"
      );
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
    this.dialogRef.close();
  }
}
