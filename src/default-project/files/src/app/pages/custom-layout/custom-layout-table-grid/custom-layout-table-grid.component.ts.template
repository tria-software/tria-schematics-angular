import { Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AnalyzeModulePermission } from "src/app/_helpers/analyze-module-permission";
import { GlobalValuesService } from "src/app/_service/global.values.service";
import { HelpersService } from "src/app/_service/helpers.service";
import { GenericModalComponent } from "src/app/components/generic-modal/generic-modal.component";
import { GenericModalDTO } from "src/app/components/generic-modal/model/generic-modal-dto";
import { CustomLayoutFilter } from "../model/custom-layout-filter";
import { CustomLayoutList } from "../model/custom-layout-list";
import { CustomLayoutService } from "../service/custom-layout.service";

@Component({
  selector: "app-custom-layout-table-grid",
  templateUrl: "./custom-layout-table-grid.component.html",
  styleUrls: ["./custom-layout-table-grid.component.scss"],
})
export class CustomLayoutTableGridComponent {
  public filter: CustomLayoutFilter = {};
  public tableList: CustomLayoutList[] = [];
  public tableRequestReturned = false;
  public totalItemsCount = 0;
  public itemsPerPageFixed = 10;
  public selectedPageIndex = 0;
  isProfileAdmin: boolean = false;

  data: [] = [];
  @Input() public listColumns: any[] = [];


  constructor(
    private toastr: ToastrService,
    private service: CustomLayoutService,
    public global: GlobalValuesService,
    public router: Router,
    public dialog: MatDialog,
    private access: AnalyzeModulePermission,
    private helpers: HelpersService
  ) { }

  ngOnInit() {
    if (!this.access.haveAccessModule("custom-layout")) return;

    this.resetFilter();
    this.getTableDataByPage(0);
  }

  resetFilter() {
    this.filter = {
      pageIndex: 0,
      pageSize: this.itemsPerPageFixed,
      search: undefined,
    };
  }

  getTableDataByPage(index: any) {
    this.tableRequestReturned = false;
    this.filter.pageIndex = Number(index);
    this.selectedPageIndex = Number(index);
    this.getList(this.filter);
  }

  changeQty(size: any) {
    this.filter.pageSize = Number(size);
    this.getTableDataByPage(0);
  }

  getList(objFilter: CustomLayoutFilter) {
    this.filter = objFilter;
    this.global.setLoading(true);
    this.service.getAll(objFilter).subscribe(
      (result: any) => {
        this.totalItemsCount = result.count;
        this.tableList = result.data;
        this.tableRequestReturned = true;
        this.global.setLoading(false);
      },
      (error: any) => {
        console.error("getList", error);
        this.tableRequestReturned = true;
        this.global.setLoading(false);
        console.log(error);
        this.toastr.error("Erro ao retornar CustomLayout", "Atenção!");
      }
    );
  }

  edit(item: any) {
    this.router.navigate(["/custom-layout-edit", item.id]);
  }

  activateDisableDelete(item: CustomLayoutList, isDelete: boolean = false) {
    const modal = new GenericModalDTO();
    modal.message = `Deseja realmente ${isDelete ? "deletar" : "desativar"} `;
    modal.messageDelete = isDelete ? "O processo não poderá ser desfeito!" : "";
    modal.type = "error";

    const dialogRef = this.dialog.open(GenericModalComponent, {
      disableClose: true,
      hasBackdrop: true,
      width: "500px",
      height: "200px",
      data: modal,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.activateDisableDeleteCustomLayout(item, isDelete);
      }
    });
  }

  activateDisableDeleteCustomLayout(item: any, isDelete: boolean = false) {
    this.global.setLoading(true);

    if (!isDelete) {
      this.service.activateDisable(item.id).subscribe(
        (result) => {
          this.getTableDataByPage(0);
          this.global.setLoading(false);

          if (result) {
            this.toastr.success("CustomLayout inativado com sucesso!", "Atenção!");
          } else {
            this.toastr.error("Erro ao inativar CustomLayout!", "Atenção!");
          }
        },
        (error) => {
          this.global.setLoading(false);
          console.log(error);
        }
      );
    } else {
      this.service.delete(item.id).subscribe(
        (result) => {
          this.getTableDataByPage(0);
          this.global.setLoading(false);

          if (result) {
            this.toastr.success("CustomLayout deletado com sucesso!", "Atenção!");
          } else {
            this.toastr.error("Erro ao deletar CustomLayout!", "Atenção!");
          }
        },
        (error) => {
          this.global.setLoading(false);
          console.log(error);
        }
      );
    }
  }

  filterColumn(column: any[]) {
    return column.filter((x) => x.isShow);
  }

  mapValue(column: any, item: any) {
    switch (column.description) {
      case "Id":
        return item.id;
      case "Data de Criação":
        return item.createDate;
      case "Stauts":
        return item.status;
      default:
        return "";
    }
  }
}
