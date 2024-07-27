import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NovaTelaFilter } from '../model/nova-tela-filter';

@Component({
  selector: 'app-nova-tela-filter',
  templateUrl: './nova-tela-filter.component.html',
  styleUrls: ['./nova-tela-filter.component.scss']
})
export class NovaTelaFilterComponent {
  @Output()
  filterObject = new EventEmitter<NovaTelaFilter>();

  @Output()
  executeResetFilter = new EventEmitter<NovaTelaFilter>();

  filter: NovaTelaFilter = {};
  form: FormGroup = this.formBuilder.group({

  });

  listStatus: any[] = [
    { id: 0, description: "Todos", value: null },
    { id: 1, description: "Ativo", value: true },
    { id: 2, description: "Inativo", value: false },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

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
