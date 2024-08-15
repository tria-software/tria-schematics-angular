import { Component, EventEmitter, Output } from '@angular/core';
import { ProfileFilterDTO } from '../model/profile-filter';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-filter',
  templateUrl: './profile-filter.component.html',
  styleUrls: ['./profile-filter.component.scss']
})
export class ProfileFilterComponent {
  @Output()
  filterObject = new EventEmitter<ProfileFilterDTO>();

  @Output()
  executeResetFilter = new EventEmitter<ProfileFilterDTO>();

  filter: ProfileFilterDTO = {};
  form: FormGroup = this.formBuilder.group({
    description: [null],
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
    this.filter.description = this.form.controls["description"].value;
    this.filter.status = this.form.controls["status"].value;

    this.filterObject.emit(this.filter);
  }

  resetFilterObject() {
    this.filter = {
      pageIndex: 0,
      pageSize: 10,
      search: undefined,
    };
  }

  resetFilter() {
    this.form.reset();
    this.resetFilterObject();
    this.executeResetFilter.emit(this.filter);
  }
}
