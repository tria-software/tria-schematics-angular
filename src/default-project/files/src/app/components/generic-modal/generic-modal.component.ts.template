import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { GenericModalDTO } from "./model/generic-modal-dto";

@Component({
  selector: "app-generic-modal",
  templateUrl: "./generic-modal.component.html",
  styleUrls: ["./generic-modal.component.scss"],
})
export class GenericModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GenericModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GenericModalDTO,
  ) {}

  ngOnInit(): void {}

  closeModal() {  
    this.dialogRef.close(false);
  }

  okClick() {
    this.dialogRef.close(true);
  }
}
