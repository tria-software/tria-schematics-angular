import { Component, OnInit, ElementRef, Input, Output, EventEmitter, SimpleChanges, AfterViewInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit, AfterViewInit, OnChanges {

  public isPanelCollapsed: boolean = false;
  private panelContent: any;
  private contentHeight: number = 0;

  constructor(private element: ElementRef) { }

  @Input()
  icon: string = '';
  @Input()
  title: string = '';
  @Input()
  startsCollapsed: boolean = false;
  @Input()
  strongColorVersion: boolean = false;
  @Input()
  isUsingExclued = false;
  @Input()
  isUsingCssTitle = false;
  @Output()
  remove = new EventEmitter<number>();

  @Output()
  OpenEvent = new EventEmitter<boolean>();

  ngOnInit() {
    this.isPanelCollapsed = this.startsCollapsed;
  }

  ngAfterViewInit() {
    this.isPanelCollapsed = this.startsCollapsed;
    this.panelContent = this.element.nativeElement.querySelector(
      '.accordion-content'
    );
    this.contentHeight = this.panelContent.scrollHeight;
    this.expandCollapse();

    //this.togglePanelCollapse();
  }

  ngOnChanges(changes: SimpleChanges) {
    const prev = changes['startsCollapsed']?.previousValue;
    const current = changes['startsCollapsed']?.currentValue;

    if (prev === false && current === true) {
      this.collapse();
      this.isPanelCollapsed = true;
    }

    if (prev === true && current === false) {
      this.expand();
      this.isPanelCollapsed = false;
    }
  }

  togglePanelCollapse() {
    this.isPanelCollapsed = !this.isPanelCollapsed;
    this.expandCollapse();
  }

  expandCollapse() {
    if (this.isPanelCollapsed) {
      this.collapse();
    } else {
      this.expand();
      this.OpenEvent.emit(true);
    }
  }

  collapse() {
    // with css we can’t go from height: 0 out of height: auto, as it will not process any animation
    // and this is why we are doing the collapse animation with javascript.
    // In this case, the way the object is being taken(ElementRef) brings height
    // and we dont need the bellow line to be implemented:
    // this.panelContent.style.height = this.contentHeight + 'px';
    this.panelContent.style.height = 0 + 'px';
  }
  expand() {
    if (this.isUsingExclued) {
      this.panelContent.style.height = this.contentHeight + 'px';
    } else {
      this.panelContent.style.height = 'auto';
    }
  }

}
