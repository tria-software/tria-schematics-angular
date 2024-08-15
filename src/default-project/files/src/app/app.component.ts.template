import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { Router, Event, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  isExpand: boolean = true;

  public showHeader = true;
  public showFooter = true;
  public isTag = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (
          event.url.match("login") ||
          event.url.match("forgot-password") ||
          event.url.match("tag")
        ) {
          this.showHeader = false;
          this.showFooter = false;

          if (event.url.match("tag")) {
            this.isTag = true;
          } else {
            this.isTag = false;
          }
        } else {
          this.isTag = false;
          this.showHeader = true;
          this.showFooter = true;

          if (event.url.match("first-access")) {
            this.showFooter = false;
          }
        }
      }
    });
  }

  expand(expand: any) {
    this.isExpand = expand;
    if (this.isExpand) {
      $(".content").addClass("content-sidebar-open");
    } else {
      $(".content").removeClass("content-sidebar-open");
    }
  }
}
