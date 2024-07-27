import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { isNil } from "lodash";
import { ToastrService } from "ngx-toastr";
import { AddressDTO } from "src/app/_dto/address-dto";
import { CepService } from "src/app/_service/cep.service";
import { GlobalValuesService } from "src/app/_service/global.values.service";

@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"],
})
export class AddressComponent {
  form: FormGroup = this.formBuilder.group({
    addressId: [0],
    city: [null, Validators.required],
    state: [null, Validators.required],
    zipCode: [null, Validators.required],
    publicPlace: [null, Validators.required],
    neighborhood: [null, Validators.required],
    number: [null, Validators.required],
    complement: [null],
  });

  sendform = false;

  constructor(
    private toastr: ToastrService,
    private service: CepService,
    private formBuilder: FormBuilder,
    private global: GlobalValuesService
  ) { }

  loadForm(address: AddressDTO) {
    this.form.controls["addressId"].setValue(address.id);
    this.form.controls["zipCode"].setValue(address.cep);
    this.form.controls["publicPlace"].setValue(address.publicPlace);
    this.form.controls["neighborhood"].setValue(address.neighborhood);
    this.form.controls["number"].setValue(address.number);
    this.form.controls["complement"].setValue(address.complement);
    this.form.controls["city"].setValue(address.city);
    this.form.controls["state"].setValue(address.state);
  }

  populeToSave() {
    const addressdto: AddressDTO = {
      id: this.form.controls["addressId"].value,
      cep: this.form.controls["zipCode"].value,
      publicPlace:
        this.form.controls["publicPlace"].value,
      neighborhood:
        this.form.controls["neighborhood"].value,
      number: this.form.controls["number"].value,
      complement:
        this.form.controls["complement"].value,
      city: this.form.controls["city"].value,
      state: this.form.controls["state"].value,
    };

    return addressdto;
  }

  getAddressByCep() {
    const cep = this.form.controls["zipCode"].value;

    if (!isNil(cep) && cep !== "") {
      this.global.setLoading(true);
      this.service.getCep(cep).subscribe(
        (result: any) => {
          this.global.setLoading(false);
          if (!isNil(result)) {
            this.form.controls["city"].setValue(result.localidade);
            this.form.controls["state"].setValue(result.uf);
            this.form.controls["neighborhood"].setValue(result.bairro);
            this.form.controls["publicPlace"].setValue(result.logradouro);
          } else {
            this.toastr.error(
              "Dados não encontrado para esse CEP!",
              "Atenção!"
            );
            this.form.controls["zipCode"].setValue(null);
            this.form.controls["city"].setValue(null);
            this.form.controls["state"].setValue(null);
            this.form.controls["neighborhood"].setValue(null);
            this.form.controls["publicPlace"].setValue(null);
          }
        },
        (error: any) => {
          this.toastr.error("Erro ao consultar endereço!", "Atenção!");
          this.global.setLoading(false);
          console.log(error);
        }
      );
    } else {
      this.form.controls["zipCode"].setValue(null);
      this.form.controls["city"].setValue(null);
      this.form.controls["state"].setValue(null);
      this.form.controls["neighborhood"].setValue(null);
      this.form.controls["publicPlace"].setValue(null);
    }
  }

  getAddressDescription() {
    const zipCode = this.form.controls["zipCode"].value;
    const publicPlace = this.form.controls["publicPlace"].value;
    const neighborhood = this.form.controls["neighborhood"].value;
    const number = this.form.controls["number"].value;
    const complement = this.form.controls["complement"].value;
    const city = this.form.controls["city"].value;
    const state = this.form.controls["state"].value;

    var description = `${zipCode} - ${publicPlace}, ${number} ${complement ? complement : ""
      } - ${neighborhood} - ${city}/${state}`;
    return description;
  }
}
