import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'my-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [ './sidebar.component.css' ]
})
export class SidebarComponent  {
  isHided=false 

  @Output() onClickAction: EventEmitter <any> = new EventEmitter;

  hideOnAction(){
    this.isHided = !this.isHided;
    this.onClickAction.emit(this.isHided);
  }
}
