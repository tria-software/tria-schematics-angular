import { Component, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { NgSelectComponent } from "@ng-select/ng-select";

import { AnalyzeModulePermission } from "src/app/_helpers/analyze-module-permission";
import { GlobalValuesService } from "src/app/_service/global.values.service";
import { FilterMenuComponent } from "src/app/components/filter-menu/filter-menu.component";
import { LayoutMenuComponent } from "src/app/components/layouts-menu/layout-menu.component";
import { CustomLayoutFilter } from "./model/custom-layout-filter";
import { CustomLayoutNewEditComponent } from "./custom-layout-new-edit/custom-layout-new-edit.component";
import { CustomLayoutTableGridComponent } from "./custom-layout-table-grid/custom-layout-table-grid.component";
import { CustomLayoutService } from "./service/custom-layout.service";
import { LayoutColumnsDTO, ListLayoutColumnsDTO } from "src/app/_dto/layout-columns-dto";
import { LayoutColumnsService } from "src/app/_service/layout-columns.service";
import { ModalAddLayoutComponent } from "src/app/components/modal-add-layout/modal-add-layout.component";

@Component({
  selector: 'app-custom-layout',
  templateUrl: './custom-layout.component.html',
  styleUrls: ['./custom-layout.component.scss']
})
export class CustomLayoutComponent {
  search?: string = undefined;
  showMenuFilter: boolean = false;
  showColumnsMenu: boolean = false;
  nameTableLayout: string = "custom-layout";

  @ViewChild(FilterMenuComponent, { static: false })
  filterMenuComponent?: FilterMenuComponent;

  @ViewChild(CustomLayoutTableGridComponent, { static: false })
  tableGrid?: CustomLayoutTableGridComponent;

  @ViewChild(LayoutMenuComponent, { static: false })
  layoutLotsMenu?: LayoutMenuComponent;

  @ViewChild(NgSelectComponent, { static: false })
  ngSelectComponent?: NgSelectComponent;

  listLayouts: ListLayoutColumnsDTO = new ListLayoutColumnsDTO();

  listColumnsDefault: any[] = [];
  listColumnsChange: any[] = [];

  textButtonLayout: string = "Salvar Layout";
  selectedLayoutId?: number;
  selectedLayoutName: string = "";

  filter: any;
  isFilterApplied: boolean = false;

  constructor(
    private toastr: ToastrService,
    private global: GlobalValuesService,
    private service: CustomLayoutService,
    public dialog: MatDialog,
    private access: AnalyzeModulePermission,
    private layoutsService: LayoutColumnsService,
  ) { }

  ngOnInit() {
    if (!this.access.haveAccessModule('custom-layout')) return;

    this.setColumnsDefault();

    this.layoutsService.getListLayouts(this.nameTableLayout).subscribe((result) => {
      this.listLayouts = result;
    });
  }

  setColumnsDefault() {
    this.listColumnsDefault = [
      { description: "Id", isShow: true },
      { description: "Data de Criação", isShow: true },
      { description: "Stauts", isShow: true },
    ];

    this.listColumnsChange = this.listColumnsDefault;
  }

  changeColumnsMenu() {
    this.showColumnsMenu = false;
    this.layoutLotsMenu?.showMenu(false);
  }

  showColumns() {
    this.showColumnsMenu = true;
    this.layoutLotsMenu?.showMenu(true);
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

  resetFilter(filterObject?: CustomLayoutFilter) {
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
    this.service.exportExcel(this.getFilter(), "CustomLayout").subscribe(
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

  async openModalAdd() {
    if (!this.selectedLayoutId) {
      const dialogRef = this.dialog.open(ModalAddLayoutComponent, {
        disableClose: true,
        hasBackdrop: true,
        width: "500px",
        height: "200px",
        data: { id: 0 },
      });
      dialogRef.afterClosed().subscribe(async (result) => {
        if (result) {
          await this.saveLayout(result);
        }
      });
    } else {
      await this.saveLayout(this.selectedLayoutName);
    }
  }

  async saveLayout(name: string) {
    const dto = {
      id: this.selectedLayoutId ?? 0,
      name: name,
      table: this.nameTableLayout,
      columns: this.listColumnsChange
        .filter((x) => x.isShow)
        .map((item) => {
          return item.description;
        }),
    };
    this.global.setLoading(true);
    this.layoutsService.saveLayout(dto).subscribe(
      (id) => {
        this.global.setLoading(false);
        if (id) {
          this.toastr.success("Layout salvo com sucesso!", "Atenção!");

          this.layoutsService
            .getListLayouts(this.nameTableLayout)
            .subscribe((result) => {
              this.listLayouts = result;

              this.selectedLayoutId = id;
              this.selectedLayoutName = dto.name;
              this.textButtonLayout = "Atualizar Layout";
            });
        } else {
          this.toastr.error("Erro ao salvar Layout!", "Atenção!");
        }
      },
      (error) => {
        this.global.setLoading(false);
      }
    );
  }

  onChangeLayout(dto: LayoutColumnsDTO) {
    if (dto) {
      this.textButtonLayout = "Atualizar Layout";
      this.selectedLayoutId = dto.id;
      this.selectedLayoutName = dto.name;

      this.listColumnsDefault.forEach((column) => (column.isShow = false));

      this.listColumnsChange = [];
      dto.columns.forEach((item) => {
        const column = this.listColumnsDefault.find(
          (c) => c.description == item
        );
        column.isShow = true;

        this.listColumnsChange.push(column);
      });

      this.listColumnsDefault
        .filter((x) => !x.isShow)
        .forEach((columnDef) => {
          const columnAdd = this.listColumnsChange.find(
            (x) => x.description === columnDef
          );
          if (!columnAdd) {
            this.listColumnsChange.push(columnDef);
          }
        });
    } else {
      this.textButtonLayout = "Salvar Layout";
      this.selectedLayoutId = 0;
      this.setColumnsDefault();
    }
  }

  deleteLayout() {
    if (!this.selectedLayoutId) return;
    this.layoutsService
      .deleteLayout(this.selectedLayoutId)
      .subscribe((result) => {
        if (result) {
          this.setColumnsDefault();
          this.ngSelectComponent?.handleClearClick();
          this.toastr.success("Layout deletado com sucesso!", "Atenção!");
          this.layoutsService
            .getListLayouts("Allocation")
            .subscribe((result) => {
              this.listLayouts = result;
            });
        } else {
          this.toastr.error("Erro ao deletar Layout!", "Atenção!");
        }
      });
  }
}
