import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-layout",
  templateUrl: "./layout-menu.component.html",
  styleUrls: ["./layout-menu.component.scss"],
})
export class LayoutMenuComponent implements OnInit {
  public isMenuActive = false;
  @Output()
  closeBackgroundFilter = new EventEmitter<any>();

  constructor() { }
  ngOnInit() { }

  showMenu(active: boolean) {
    this.isMenuActive = active;
  }

  closeFilter() {
    this.closeBackgroundFilter.emit();
    this.showMenu(false);
  }
}
