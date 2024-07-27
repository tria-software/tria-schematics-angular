import { Component, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { AnalyzeModulePermission } from "src/app/_helpers/analyze-module-permission";
import { GlobalValuesService } from "src/app/_service/global.values.service";
import { FilterMenuComponent } from "src/app/components/filter-menu/filter-menu.component";
import { NovaTelaFilter } from "./model/nova-tela-filter";
import { NovaTelaNewEditComponent } from "./nova-tela-new-edit/nova-tela-new-edit.component";
import { NovaTelaTableGridComponent } from "./nova-tela-table-grid/nova-tela-table-grid.component";
import { NovaTelaService } from "./service/nova-tela.service";

@Component({
  selector: 'app-nova-tela',
  templateUrl: './nova-tela.component.html',
  styleUrls: ['./nova-tela.component.scss']
})
export class NovaTelaComponent {
  search?: string = undefined;
  showMenuFilter: boolean = false;

  @ViewChild(FilterMenuComponent, { static: false })
  filterMenuComponent?: FilterMenuComponent;

  @ViewChild(NovaTelaTableGridComponent, { static: false })
  tableGrid?: NovaTelaTableGridComponent;

  filter: any;
  isFilterApplied: boolean = false;

  constructor(
    private toastr: ToastrService,
    private global: GlobalValuesService,
    private service: NovaTelaService,
    public dialog: MatDialog,
    private access: AnalyzeModulePermission
  ) { }

  ngOnInit() {
    if (!this.access.haveAccessModule('nova-tela')) return;
  }

  changeFilterMenu() {
    this.showMenuFilter = false;
    this.filterMenuComponent?.showMenu(false);
  }

  applyFilter(filterObject?: any) {
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

  resetFilter(filterObject?: NovaTelaFilter) {
    this.search = undefined;
    this.applyFilter(filterObject);
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
    this.service.exportExcel(this.getFilter(), "NovaTela").subscribe(
      (node: any) => {
        this.global.setLoading(false);
        const url = window.URL.createObjectURL(node.data);
        const hiddenLink = document.createElement("a");
        document.body.appendChild(hiddenLink);
        hiddenLink.setAttribute("style", "display: none");
        hiddenLink.href = url;
        hiddenLink.download = node.filename;
        hiddenLink.click();
        window.URL.revokeObjectURL(url);
        hiddenLink.remove();
      },
      (error) => {
        this.global.setLoading(false);
      }
    );
  }
}
