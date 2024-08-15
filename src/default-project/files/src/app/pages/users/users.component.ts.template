import { Component, ViewChild } from '@angular/core';
import { GlobalValuesService } from 'src/app/_service/global.values.service';
import { FilterMenuComponent } from 'src/app/components/filter-menu/filter-menu.component';
import { UsersTableGridComponent } from './users-table-grid/users-table-grid.component';
import { UserFilter } from './model/user-filter';
import { UserService } from './service/user.service';
import { AnalyzeModulePermission } from 'src/app/_helpers/analyze-module-permission';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  search?: string = undefined;
  showMenuFilter: boolean = false;

  @ViewChild(FilterMenuComponent, { static: false })
  filterMenuComponent?: FilterMenuComponent;

  @ViewChild(UsersTableGridComponent, { static: false })
  tableGrid?: UsersTableGridComponent;

  filter: any;
  isFilterApplied: boolean = false;

  constructor(
    private global: GlobalValuesService,
    private service: UserService,
    private access: AnalyzeModulePermission
  ) { }

  ngOnInit() {
    if (!this.access.haveAccessModule('users')) return;
  }

  changeFilterMenu() {
    this.showMenuFilter = false;
    this.filterMenuComponent?.showMenu(false);
  }

  ApplyFilter(filterObject?: any) {
    this.isFilterApplied = true;
    this.showMenuFilter = false;
    this.filterMenuComponent?.showMenu(false);
    this.filter = filterObject;
    this.tableGrid?.getList(filterObject);
  }

  showFilter() {
    this.showMenuFilter = true;
    this.filterMenuComponent?.showMenu(true);
  }

  executeSearch() {
    this.tableGrid?.resetFilter();
    this.filter = this.tableGrid?.filter;
    this.filter.search = this.search;
    this.tableGrid?.getList(this.filter);
  }

  resetFilter(filterObject?: UserFilter) {
    this.search = undefined;
    this.ApplyFilter(filterObject);
    this.isFilterApplied = false;
  }

  getFilter(): any {
    if (!this.filter) {
      return this.tableGrid?.filter;
    }

    return this.filter;
  }

  exportExcel() {
    this.global.setLoading(true);
    this.service.exportExcel(this.getFilter(), "Usuários").subscribe(
      (node: any) => {
        this.global.setLoading(false);
        const url = window.URL.createObjectURL(node.data);
        const hiddenLink = document.createElement('a');
        document.body.appendChild(hiddenLink);
        hiddenLink.setAttribute('style', 'display: none');
        hiddenLink.href = url;
        hiddenLink.download = node.filename;
        hiddenLink.click();
        window.URL.revokeObjectURL(url);
        hiddenLink.remove();
      }, error => {
        this.global.setLoading(false);
      });
  }

}
