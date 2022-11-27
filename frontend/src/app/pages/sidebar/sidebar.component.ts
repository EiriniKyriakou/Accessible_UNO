import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'my-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [ './sidebar.component.css' ]
})
export class SidebarComponent  {
  isHided=false 
  inProfile=false

  @Output() onClickAction: EventEmitter <any> = new EventEmitter;

  hideOnAction(){
    this.isHided = !this.isHided;
    this.onClickAction.emit(this.isHided);
    if(this.inProfile){
      this.inProfile=!this.inProfile
    }
    
  }
  profile(){
    this.inProfile=true
  }
}
