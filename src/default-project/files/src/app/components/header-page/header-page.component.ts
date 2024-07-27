import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header-page",
  templateUrl: "./header-page.component.html",
  styleUrls: ["./header-page.component.scss"],
})
export class HeaderPageComponent implements OnInit {
  @Input() showBtn = true;
  @Input() isCallMethod = false;
  @Input() titleBtn = "Adicionar";
  @Input() title = "";
  @Input() urlBtn = "";
  @Output() callMethod = new EventEmitter<any>(); 

  constructor() {}

  ngOnInit() {}

  sendMethod(){
    this.callMethod.emit();
  }
}
