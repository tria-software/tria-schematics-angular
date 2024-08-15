import { Component, Inject } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-modal-add-layout",
  templateUrl: "./modal-add-layout.component.html",
  styleUrls: ["./modal-add-layout.component.scss"],
})
export class ModalAddLayoutComponent {
  form: FormGroup = this.formBuilder.group({
    description: [null, Validators.required],
  });

  sendform = false;
  isAdd = true;
  id: number = 0;

  constructor(
    private toastr: ToastrService,
    public router: Router,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalAddLayoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
  }

  save() {
    if (this.form.valid) {
      const description = this.form.controls["description"].value;
      this.dialogRef.close(description);
    } else {
      this.toastr.error("Preencha todos os campos obrigatórios!", "Atenção!");
      this.sendform = true;
    }
  }

  closeModal() {
    this.dialogRef.close(false);
  }
}
