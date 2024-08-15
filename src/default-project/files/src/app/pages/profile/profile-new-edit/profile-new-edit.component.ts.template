import { Component } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { Router, ActivatedRoute } from "@angular/router";
import { isNil } from "lodash";
import { ToastrService } from "ngx-toastr";
import { GlobalValuesService } from "src/app/_service/global.values.service";
import { ProfileDTO } from "../model/profile-dto";
import { ProfileService } from "../service/profile.service";
import { NavService } from "src/app/components/side-menu/service/nav.service";
import {
  NavItem,
  NavModule,
} from "src/app/components/side-menu/service/nav-item";
import { AnalyzeModulePermission } from "src/app/_helpers/analyze-module-permission";

@Component({
  selector: "app-profile-new-edit",
  templateUrl: "./profile-new-edit.component.html",
  styleUrls: ["./profile-new-edit.component.scss"],
})
export class ProfileNewEditComponent {
  form: FormGroup = this.formBuilder.group({
    id: [0],
    createDate: [null],
    description: [null, Validators.required],
    allAccessModules: [false],
  });

  sendform = false;
  isAdd = true;
  id?: number;
  isAllAccessModules: boolean = false;
  //moduleList: NavItem[] = this.nav.getModulesToPerfil();
  moduleList: NavModule[] = this.nav.getNavModules();

  constructor(
    private toastr: ToastrService,
    private service: ProfileService,
    public router: Router,
    private formBuilder: FormBuilder,
    private global: GlobalValuesService,
    private activatedRoute: ActivatedRoute,
    private nav: NavService,
    private access: AnalyzeModulePermission
  ) {}

  ngOnInit() {
    if (!this.access.haveAccessModule("profiles")) return;
    this.loadQueryRoute();
  }

  loadQueryRoute() {
    if (!this.activatedRoute.snapshot.paramMap.get("id")) {
      return;
    }
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.isAdd = false;
    this.loadFields();
  }

  loadFields() {
    this.global.setLoading(true);
    this.service.getById(this.id ?? 0).subscribe(
      (result: any) => {
        this.global.setLoading(false);
        if (isNil(result)) {
          this.goToIndex();
          return;
        }

        this.loadDataFields(result);
      },
      (error: any) => {
        this.global.setLoading(false);
        console.log(error);
      }
    );
  }

  loadDataFields(data: any) {
    this.form.controls["id"].setValue(data.id);
    this.form.controls["description"].setValue(data.description);
    this.form.controls["allAccessModules"].setValue(data.accessAllModules);
    this.form.controls["createDate"].setValue(data.createDate);
    this.isAllAccessModules = data.accessAllModules;

    this.moduleList.forEach((modules) => {
      modules.children.forEach((items) => {
        if (items.children) {
          items.children?.forEach((children) => {
            data.modules.forEach((access: string) => {
              if (children.value == access) {
                children.checked = true;
              }
            });
          });
        }
      });
    });
  }

  goToIndex() {
    this.router.navigate(["/profiles"]);
  }

  save() {
    if (this.form.valid) {
      const model = this.populeModelToSave();
      console.log(model);
      if (!model.accessAllModules && model.modules.length === 0) {
        this.toastr.warning(
          "Selecione pelo menos uma tela de acesso",
          "Atenção!"
        );
        return;
      }

      if (model.id === 0) {
        this.add(model);
      } else {
        this.update(model);
      }
    } else {
      this.toastr.error("Preencha todos os campos obrigatórios!", "Atenção!");
      this.sendform = true;
    }
  }

  add(model: ProfileDTO) {
    this.global.setLoading(true);
    this.service.add(model).subscribe(
      (result: any) => {
        if (result) {
          this.toastr.success("Perfil salvo com sucesso!", "Atenção!");
          this.goToIndex();
        } else {
          this.toastr.success("Erro ao salvar perfil!", "Atenção!");
        }

        this.clearRequest();
      },
      (error: any) => {
        this.clearRequest();
        console.log(error);
      }
    );
  }

  update(model: ProfileDTO) {
    this.global.setLoading(true);
    this.service.update(model).subscribe(
      (result: any) => {
        this.clearRequest();
        if (result) {
          this.toastr.success("Perfil atualizado com sucesso!", "Atenção!");
          this.goToIndex();
        } else {
          this.toastr.error("Erro ao atualizar perfil!", "Atenção!");
        }
      },
      (error: any) => {
        console.log(error);
        this.clearRequest();
      }
    );
  }

  populeModelToSave(): ProfileDTO {
    const model = new ProfileDTO();
    model.id = this.id ?? 0;
    if (!this.isAdd) model.createDate = this.form.controls["createDate"].value;
    model.description = this.form.controls["description"].value;
    model.accessAllModules = this.form.controls["allAccessModules"].value;

    const allModules = this.moduleList.flatMap((x) => x.children);
    const allChidrens = allModules.flatMap((c) => c.children ?? []);

    model.modules = allChidrens
      .map((x) => {
        if (x.checked) return x.value;
        else return "";
      })
      .filter((x) => x !== "");

    return model;
  }

  clearRequest() {
    this.sendform = false;
    this.global.setLoading(false);
  }

  accessAllModules(event: MatSlideToggleChange) {
    this.isAllAccessModules = event.checked;
  }

  checkedAllChildren(item: NavItem) {
    item.checked = !item.checked;
    if (item.children) {
      item.children.forEach((children) => {
        children.checked = !children.checked;
      });
    }
  }

  allChildrenChecked(item: NavItem): boolean {
    if (!item.children) return false;
    return item.children?.every((x) => x.checked) ?? false;
  }
}
