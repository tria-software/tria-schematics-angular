import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { GlobalValuesService } from "src/app/_service/global.values.service";
import { GenericModalComponent } from "src/app/components/generic-modal/generic-modal.component";
import { GenericModalDTO } from "src/app/components/generic-modal/model/generic-modal-dto";
import { ProfileService } from "../service/profile.service";
import { ProfileFilterDTO } from "../model/profile-filter";
import { AnalyzeModulePermission } from "src/app/_helpers/analyze-module-permission";

@Component({
  selector: "app-profile-table-grid",
  templateUrl: "./profile-table-grid.component.html",
  styleUrls: ["./profile-table-grid.component.scss"],
})
export class ProfileTableGridComponent {
  public filter: ProfileFilterDTO = {};
  public tableList: any[] = [];
  public tableRequestReturned = false;
  public totalItemsCount = 0;
  public itemsPerPageFixed = 10;
  public selectedPageIndex = 0;

  constructor(
    private toastr: ToastrService,
    private service: ProfileService,
    public global: GlobalValuesService,
    public router: Router,
    public dialog: MatDialog,
    private access: AnalyzeModulePermission
  ) { }

  ngOnInit() {
    if (!this.access.haveAccessModule("profiles")) return;
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

  changeQty(index: any) {
    this.filter.pageIndex = Number(index);
    this.getTableDataByPage(0);
  }

  getList(objFilter: ProfileFilterDTO) {
    this.global.setLoading(true);
    objFilter.pageSize = this.itemsPerPageFixed;

    this.service.getAll(objFilter).subscribe(
      (result: any) => {
        this.totalItemsCount = result.count;
        this.tableList = result.data;
        this.tableRequestReturned = true;
        this.global.setLoading(false);
      },
      (error: any) => {
        this.tableRequestReturned = true;
        this.global.setLoading(false);
        console.log(error);
        this.toastr.error("Erro ao retornar Perfils", "Atenção!");
      }
    );
  }

  edit(item: any) {
    this.router.navigate(["/profiles-edit", item.id]);
  }

  activateDisable(item: any) {
    const modal = new GenericModalDTO();
    modal.message = `Deseja realmente ${item.status ? "desativar" : "ativar"} `;
    modal.item = `${item.description}?`;
    modal.type = item.status ? "error" : "success";

    const dialogRef = this.dialog.open(GenericModalComponent, {
      disableClose: true,
      hasBackdrop: true,
      width: "500px",
      height: "200px",
      data: modal,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.activateDisableProfile(item);
      }
    });
  }

  activateDisableProfile(item: any) {
    this.global.setLoading(true);
    this.service.activateDisable(item.id).subscribe(
      (result) => {
        this.global.setLoading(false);

        const { success, message } = result as { success: boolean, message: string };

        if (success) {
          this.getTableDataByPage(0);

          this.toastr.success("Perfil atualizado com sucesso!", "Atenção!");
        } else {
          this.toastr.error(`${message}`, "Atenção!");
        }
      },
      (error) => {
        this.global.setLoading(false);
        console.log(error);
      }
    );
  }
}
