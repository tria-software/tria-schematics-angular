import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserFilter } from "../model/user-filter";

@Component({
  selector: "app-users-filter",
  templateUrl: "./users-filter.component.html",
  styleUrls: ["./users-filter.component.scss"],
})
export class UsersFilterComponent {
  @Output()
  filterObject = new EventEmitter<UserFilter>();

  @Output()
  executeResetFilter = new EventEmitter<UserFilter>();

  filter: UserFilter = {};
  form: FormGroup = this.formBuilder.group({
    name: [null],
    lastName: [null],
    email: [null],
    status: [null],
  });

  listStatus: any[] = [
    { id: 0, description: "Todos", value: null },
    { id: 1, description: "Ativo", value: true },
    { id: 2, description: "Inativo", value: false },
  ];


  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
  }

  sendFilter() {
    this.resetFilterObject();
    this.filter.name = this.form.controls["name"].value;
    this.filter.lastName = this.form.controls["lastName"].value;
    this.filter.email = this.form.controls["email"].value;
    this.filter.status = this.form.controls["status"].value;

    this.filterObject.emit(this.filter);
  }

  resetFilterObject() {
    this.filter = {
      pageIndex: 0,
      pageSize: 10,
      search: undefined,
      status: undefined,
      multiplierIds: [],
    };
  }

  resetFilter() {
    this.form.reset();
    this.resetFilterObject();
    this.executeResetFilter.emit(this.filter);
  }
}
