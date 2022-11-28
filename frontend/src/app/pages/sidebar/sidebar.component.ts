import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'my-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [ './sidebar.component.css' ]
})
export class SidebarComponent  {
  isHided=false 
  inProfile=false
  editUsername=false
  editPassword=false
  editAccessibility=false
  @Output() onClickAction: EventEmitter <any> = new EventEmitter;

  hideOnAction(){
    this.isHided = !this.isHided;
    this.editUsername=false
    this.editPassword=false
    this.editAccessibility=false
    this.onClickAction.emit(this.isHided);
    if(this.inProfile){
      this.inProfile=!this.inProfile
    }
    
  }
  profile(){
    this.inProfile=true
  }
  username(){
    this.editUsername=true
    this.inProfile=false
  }
  editUsernameFunction(){
    this.inProfile=true
  }
  password(){
    this.editPassword=true
    this.inProfile=false
  }
  editPasswordFunction(){
    this.inProfile=true
  }
  accessibility(){
    this.editAccessibility=true
    this.inProfile=false
  }
  editAccessibilityFunction(){
    this.inProfile=true
  }
}
