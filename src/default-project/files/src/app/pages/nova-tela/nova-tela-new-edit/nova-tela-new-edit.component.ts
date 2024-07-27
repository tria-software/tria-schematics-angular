import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { isNil } from "lodash";
import { ToastrService } from "ngx-toastr";
import { GlobalValuesService } from "src/app/_service/global.values.service";
import { AnalyzeModulePermission } from "src/app/_helpers/analyze-module-permission";
import { FormatValues } from "src/app/_helpers/format-values";
import { Functions } from "src/app/_helpers/functions";
import { NovaTelaDTO } from "../model/nova-tela-dto";
import { NovaTelaService } from "../service/nova-tela.service";

@Component({
  selector: "app-nova-tela-new-edit",
  templateUrl: "./nova-tela-new-edit.component.html",
  styleUrls: ["./nova-tela-new-edit.component.scss"],
})
export class NovaTelaNewEditComponent {
  form: FormGroup = this.formBuilder.group({
    id: [0],
    createDate: [null],
  });

  functions: Functions = new Functions();
  format: FormatValues = new FormatValues();

  sendform = false;
  isAdd = true;
  id: number = 0;

  constructor(
    private toastr: ToastrService,
    private service: NovaTelaService,
    public router: Router,
    private formBuilder: FormBuilder,
    private global: GlobalValuesService,
    private activatedRoute: ActivatedRoute,
    private access: AnalyzeModulePermission,
  ) { }

  ngOnInit() {
    if (!this.access.haveAccessModule("nova-tela")) return;

    this.loadQueryRoute();
  }

  loadQueryRoute() {
    if (!this.activatedRoute.snapshot.paramMap.get("id")) {
      return;
    }
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.isAdd = false;
    this.loadNovaTelas();
  }

  loadNovaTelas() {
    this.global.setLoading(true);
    this.service.getById(this.id).subscribe(
      (result: any) => {
        this.global.setLoading(false);
        if (isNil(result)) {
          this.goToIndex();
          return;
        }
        this.loadDataNovaTelas(result);
      },
      (error: any) => {
        this.global.setLoading(false);
        console.log(error);
      }
    );
  }

  loadDataNovaTelas(data: NovaTelaDTO) {
    this.form.controls["id"].setValue(data.id);
    this.form.controls["createDate"].setValue(data.createDate);

    /* Adicione aqui seu código */
  }

  goToIndex() {
    this.router.navigate(["/nova-tela"]);
  }

  save() {
    if (this.form.valid) {
      const model = this.populeModelToSave();

      if (model.id === 0) {
        this.add(model);
      } else {
        this.update(model);
      }
    } else {
      const model = this.populeModelToSave();
      console.log(model)
      this.toastr.error("Preencha todos os campos obrigatórios!", "Atenção!");
      this.sendform = true;
    }
  }

  add(model: NovaTelaDTO) {
    this.global.setLoading(true);
    this.service.add(model).subscribe(
      (result: any) => {
        if (result) {
          this.toastr.success("NovaTela salvo com sucesso!", "Atenção!");
          this.goToIndex();
        } else {
          this.toastr.success("Erro ao salvar NovaTela!", "Atenção!");
        }

        this.clearRequest();
      },
      (error: any) => {
        this.clearRequest();
        console.log(error);
      }
    );
  }

  update(model: NovaTelaDTO) {
    this.global.setLoading(true);
    this.service.update(model).subscribe(
      (result: any) => {
        this.clearRequest();
        if (result) {
          this.toastr.success(
            "NovaTela atualizado com sucesso!",
            "Atenção!"
          );
          this.goToIndex();
        } else {
          this.toastr.error("Erro ao atualizar NovaTela!", "Atenção!");
        }
      },
      (error: any) => {
        console.log(error);
        this.clearRequest();
      }
    );
  }

  populeModelToSave(): NovaTelaDTO {
    const model = new NovaTelaDTO();
    model.id = this.id;

    if (!this.isAdd) model.createDate = this.form.controls["createDate"].value;
    /* Adicione aqui seu código */

    return model;
  }

  clearRequest() {
    this.sendform = false;
    this.global.setLoading(false);
  }

  onlyNumber(event: any) {
    return this.functions.onlyNumber(event, false);
  }
}
