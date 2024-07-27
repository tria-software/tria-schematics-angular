import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AnalyzeModulePermission } from "src/app/_helpers/analyze-module-permission";
import { GlobalValuesService } from "src/app/_service/global.values.service";
import { HelpersService } from "src/app/_service/helpers.service";
import { GenericModalComponent } from "src/app/components/generic-modal/generic-modal.component";
import { GenericModalDTO } from "src/app/components/generic-modal/model/generic-modal-dto";
import { NovaTelaFilter } from "../model/nova-tela-filter";
import { NovaTelaList } from "../model/nova-tela-list";
import { NovaTelaService } from "../service/nova-tela.service";

@Component({
  selector: "app-nova-tela-table-grid",
  templateUrl: "./nova-tela-table-grid.component.html",
  styleUrls: ["./nova-tela-table-grid.component.scss"],
})
export class NovaTelaTableGridComponent {
  public filter: NovaTelaFilter = {};
  public tableList: NovaTelaList[] = [];
  public tableRequestReturned = false;
  public totalItemsCount = 0;
  public itemsPerPageFixed = 10;
  public selectedPageIndex = 0;
  isProfileAdmin: boolean = false;

  constructor(
    private toastr: ToastrService,
    private service: NovaTelaService,
    public global: GlobalValuesService,
    public router: Router,
    public dialog: MatDialog,
    private access: AnalyzeModulePermission,
    private helpers: HelpersService
  ) { }

  ngOnInit() {
    if (!this.access.haveAccessModule("nova-tela")) return;

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

  getList(objFilter: NovaTelaFilter) {
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
        this.toastr.error("Erro ao retornar NovaTela", "Atenção!");
      }
    );
  }

  edit(item: any) {
    this.router.navigate(["/nova-tela-edit", item.id]);
  }

  activateDisableDelete(item: NovaTelaList, isDelete: boolean = false) {
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
        this.activateDisableDeleteNovaTela(item, isDelete);
      }
    });
  }

  activateDisableDeleteNovaTela(item: any, isDelete: boolean = false) {
    this.global.setLoading(true);

    if (!isDelete) {
      this.service.activateDisable(item.id).subscribe(
        (result) => {
          this.getTableDataByPage(0);
          this.global.setLoading(false);

          if (result) {
            this.toastr.success("NovaTela inativado com sucesso!", "Atenção!");
          } else {
            this.toastr.error("Erro ao inativar NovaTela!", "Atenção!");
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
            this.toastr.success("NovaTela deletado com sucesso!", "Atenção!");
          } else {
            this.toastr.error("Erro ao deletar NovaTela!", "Atenção!");
          }
        },
        (error) => {
          this.global.setLoading(false);
          console.log(error);
        }
      );
    }
  }
}
