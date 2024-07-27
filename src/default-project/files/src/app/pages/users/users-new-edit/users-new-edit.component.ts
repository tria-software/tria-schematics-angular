import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { isNil } from "lodash";
import { ToastrService } from "ngx-toastr";
import { GlobalValuesService } from "src/app/_service/global.values.service";
import { UserDTO } from "../model/user-dto";
import { UserService } from "../service/user.service";
import { SelectedDTO } from "src/app/_models/selected-dto";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { AnalyzeModulePermission } from "src/app/_helpers/analyze-module-permission";

@Component({
  selector: "app-users-new-edit",
  templateUrl: "./users-new-edit.component.html",
  styleUrls: ["./users-new-edit.component.scss"],
})
export class UsersNewEditComponent {
  form: FormGroup = this.formBuilder.group({
    id: [0],
    createDate: [null],
    name: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [
      null,
      [
        Validators.maxLength(100),
        Validators.minLength(5),
        Validators.pattern(/.+@.+\..+/),
        Validators.required,
      ],
    ],
    password: [null, Validators.required],
    passwordConfirmation: [null, Validators.required],
    profileId: [null, Validators.required],
    multiplierIds: [null],
    allAccessMultipliers: [false],
    firstAccess: [false],
  });

  sendform = false;
  isAdd = true;
  id?: number;
  showPassword = false;
  showPasswordConfirmation = false;
  loadingMultiplires: boolean = false;
  lstMultipliers: SelectedDTO[] = [];
  lstProfiles: SelectedDTO[] = [];
  isAllAccessMultipliers: boolean = false;

  constructor(
    private toastr: ToastrService,
    private service: UserService,
    public router: Router,
    private formBuilder: FormBuilder,
    private global: GlobalValuesService,
    private activatedRoute: ActivatedRoute,
    private access: AnalyzeModulePermission
  ) { }

  ngOnInit() {
    if (!this.access.haveAccessModule("users")) return;

    this.getProfiles();
    this.loadQueryRoute();
  }

  loadQueryRoute() {
    if (!this.activatedRoute.snapshot.paramMap.get("id")) {
      return;
    }
    this.form.removeControl("passwordConfirmation");
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
    this.form.controls["name"].setValue(data.name);
    this.form.controls["lastName"].setValue(data.lastName);
    this.form.controls["email"].setValue(data.email);
    this.form.controls["profileId"].setValue(data.profileId);
    this.form.controls["allAccessMultipliers"].setValue(
      data.accessAllMultipliers
    );
    this.form.controls["multiplierIds"].setValue(data.multiplierIds);
    this.form.controls["createDate"].setValue(data.createDate);
    this.form.controls["password"].setValue(data.password);
    this.form.controls["firstAccess"].setValue(data.firstAccess);
    this.isAllAccessMultipliers = data.accessAllMultipliers;
  }

  goToIndex() {
    this.router.navigate(["/users"]);
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
      this.toastr.error("Preencha todos os campos obrigatórios!", "Atenção!");
      this.sendform = true;
    }
  }

  add(model: UserDTO) {
    this.global.setLoading(true);
    this.service.add(model).subscribe(
      (result: any) => {
        if (result) {
          this.toastr.success("Usuário salvo com sucesso!", "Atenção!");
          this.goToIndex();
        } else {
          this.toastr.success("Erro ao salvar usuário!", "Atenção!");
        }

        this.clearRequest();
      },
      (error: any) => {
        this.clearRequest();
        console.log(error);
      }
    );
  }

  update(model: UserDTO) {
    this.global.setLoading(true);
    this.service.update(model).subscribe(
      (result: any) => {
        this.clearRequest();
        if (result) {
          this.toastr.success("Usuário atualizado com sucesso!", "Atenção!");
          this.goToIndex();
        } else {
          this.toastr.error("Erro ao atualizar usuário!", "Atenção!");
        }
      },
      (error: any) => {
        console.log(error);
        this.clearRequest();
      }
    );
  }

  populeModelToSave(): UserDTO {
    const model = new UserDTO();
    model.id = this.id ?? 0;
    if (!this.isAdd) {
      model.createDate = this.form.controls["createDate"].value;
      model.firstAccess = this.form.controls["firstAccess"].value;
    }
    model.name = this.form.controls["name"].value;
    model.lastName = this.form.controls["lastName"].value;
    model.email = this.form.controls["email"].value;
    model.login = this.form.controls["email"].value;
    model.accessAllMultipliers =
      this.form.controls["allAccessMultipliers"].value;
    model.multiplierIds = this.form.controls["multiplierIds"].value;
    model.password = this.form.controls["password"].value;
    model.profileId = this.form.controls["profileId"].value;

    return model;
  }

  clearRequest() {
    this.sendform = false;
    this.global.setLoading(false);
  }

  accessAllMultipliers(event: MatSlideToggleChange) {
    this.isAllAccessMultipliers = event.checked;
    this.form.controls["multiplierIds"].setValue(null);
  }

  getProfiles() {
    this.service.getAllProfiles().subscribe(
      (result: any) => {
        this.lstProfiles = result.data.map((item: any) => {
          const option: SelectedDTO = {
            id: item.id,
            description: item.description,
            value: item.id,
          };

          return option;
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  verifyExistsEmail() {
    if (this.form.controls["email"].invalid) return;

    const email = this.form.controls["email"].value;
    if (!isNil(email) && email !== "") {
      this.global.setLoading(true);
      this.service.verifyExistsEmail(email, this.id).subscribe(
        (exists) => {
          if (exists) {
            this.form.controls["email"].setValue(null);
            this.toastr.warning("E-mail já cadastrado no sistema", "Atenção!");
          }

          this.global.setLoading(false);
        },
        (error) => {
          this.toastr.error("Erro ao consultar e-mail", "Atenção!");
          console.log(error);
          this.global.setLoading(false);
        }
      );
    }
  }
}
