import { Component, ViewChild } from '@angular/core';
import { GlobalValuesService } from 'src/app/_service/global.values.service';
import { FilterMenuComponent } from 'src/app/components/filter-menu/filter-menu.component';
import { ProfileFilterDTO } from './model/profile-filter';
import { ProfileService } from './service/profile.service';
import { ProfileTableGridComponent } from './profile-table-grid/profile-table-grid.component';
import { AnalyzeModulePermission } from 'src/app/_helpers/analyze-module-permission';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  search?: string = undefined;
  showMenuFilter: boolean = false;

  @ViewChild(FilterMenuComponent, { static: false })
  filterMenuComponent?: FilterMenuComponent;

  @ViewChild(ProfileTableGridComponent, { static: false })
  tableGrid?: ProfileTableGridComponent;

  filter: any;
  isFilterApplied: boolean = false;

  constructor(
    private global: GlobalValuesService,
    private service: ProfileService,
    private access: AnalyzeModulePermission
    ) { }

  ngOnInit() {
    if (!this.access.haveAccessModule('profiles')) return;
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

  resetFilter(filterObject?: ProfileFilterDTO) {
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
    this.service.exportExcel(this.getFilter(), "Perfis").subscribe(
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
      }, (error: any) => {
        this.global.setLoading(false);
      });
  }
}
