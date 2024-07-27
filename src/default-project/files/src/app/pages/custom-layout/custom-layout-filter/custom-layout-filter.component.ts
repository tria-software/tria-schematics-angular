import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomLayoutFilter } from '../model/custom-layout-filter';

@Component({
  selector: 'app-custom-layout-filter',
  templateUrl: './custom-layout-filter.component.html',
  styleUrls: ['./custom-layout-filter.component.scss']
})
export class CustomLayoutFilterComponent {
  @Output()
  filterObject = new EventEmitter<CustomLayoutFilter>();

  @Output()
  executeResetFilter = new EventEmitter<CustomLayoutFilter>();

  filter: CustomLayoutFilter = {};
  form: FormGroup = this.formBuilder.group({

  });

  listStatus: any[] = [
    { id: 0, description: "Todos", value: null },
    { id: 1, description: "Ativo", value: true },
    { id: 2, description: "Inativo", value: false },
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() { }

  sendFilter() {
    this.resetFilterObject();

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
