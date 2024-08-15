import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-filter-menu",
  templateUrl: "./filter-menu.component.html",
  styleUrls: ["./filter-menu.component.scss"],
})
export class FilterMenuComponent implements OnInit {
  public isMenuActive = false;
  @Output()
  closeBackgroundFilter = new EventEmitter<any>();

  constructor() {}
  ngOnInit() {}

  showMenu(active: boolean) {
    this.isMenuActive = active;
  }

  closeFilter() {
    this.closeBackgroundFilter.emit();
    this.showMenu(false);
  }
}
