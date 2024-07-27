import { Component, OnInit } from '@angular/core';
import { GlobalValuesService } from 'src/app/_service/global.values.service';

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss']
})
export class PageLoaderComponent implements OnInit {
  public applicationPageLoading: boolean = true;
  constructor(private globals: GlobalValuesService) { }

  ngOnInit() {
    this.globals.applicationPageLoading.subscribe(loading => {
      setTimeout(() => {
        this.applicationPageLoading = loading;
      }, 100);
    });
  }
}
