import { Component, Input } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt";
import localePtExtra from "@angular/common/locales/extra/pt";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

registerLocaleData(localePt, "pt-br", localePtExtra);

export interface Character {
  name: string;
  image: string;
  fatality: string;
}

@Component({
  selector: "app-table-grid-generic-list",
  templateUrl: "./table-grid-generic.component.html",
  styleUrls: ["./table-grid-generic.component.scss"],
})
export class TableGridGenericComponent {
  @Input() listColumns: any[] = [];

  constructor() {}

  ngOnInit() {}

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.listColumns, event.previousIndex, event.currentIndex);
    } else {

      transferArrayItem(this.listColumns,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
