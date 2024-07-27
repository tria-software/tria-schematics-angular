import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { NavItem } from "../service/nav-item";
import { NavService } from "../service/nav.service";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

@Component({
  selector: "app-side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.scss"],
  animations: [
    trigger("indicatorRotate", [
      state("collapsed", style({ transform: "rotate(0deg)" })),
      state("expanded", style({ transform: "rotate(180deg)" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4,0.0,0.2,1)")
      ),
    ]),
  ],
})
export class SideNavComponent implements OnInit {
  @Input() item?: NavItem;
  @Input() isMod: Boolean = false;
  @Input() depth?: number;

  @Output()
  closeMenu = new EventEmitter<boolean>();

  expanded: boolean = false;
  expandedMod: boolean = false;
  expandedSub: boolean = false;

  constructor(public navService: NavService) {
    if (this.depth === undefined) {
      this.depth = 40;
    }
  }

  ngOnInit(): void {}

  onChildSelected() {
    this.closeMenu.emit(true);
    this.expanded = false;
    this.expandedMod = false;
    this.expandedSub = false;
  }

  onItemSelected(
    item?: NavItem,
    isMod: boolean = false,
    isSub: boolean = false
  ) {
    if (!item?.children || !item.children.length) {
      this.closeMenu.emit();
    }
    if (item?.children && item.children.length && !isMod && !isSub) {
      this.expanded = !this.expanded;
    }

    if (isMod) {
      this.expandedMod = !this.expandedMod;
    }

    if (isSub) {
      this.expandedSub = !this.expandedSub;
    }
  }
}
