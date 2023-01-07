import { Component, EventEmitter, Output, Input } from '@angular/core';
import { PlayerModel } from 'src/app/global/models/players/player.model';
import { PlayersService } from 'src/app/global/services/players/players.service';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';

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
  name = ""
  pass = "";
  cpass = "";
  dysrhythmia=false;
  dyslexia=false;
  impairedVision=false;
  colorblindness=false;
  @Output() onClickAction: EventEmitter <any> = new EventEmitter;
  @Input()
  player!: PlayerModel;

  constructor(private playersService: PlayersService, private router: Router) {  }

  ngOnInit() { 
    this.dysrhythmia = this.player.dysrhythmia;
    this.dyslexia = this.player.dyslexia;
    this.impairedVision = this.player.impairedVision;
    this.colorblindness = this.player.colorblindness;
  }

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
    this.editUsername=false;
    this.inProfile=true
    this.player.username = this.name;
    this.playersService.update(this.player).subscribe((result: any) => { 
      Swal.fire({
        icon: 'success',
        title: 'Your username was changed succefully'
      })
    });
      //console.log(this.players)
  }

  password(){
    this.editPassword=true
    this.inProfile=false
  }
  editPasswordFunction(){
    this.editPassword=false;
    this.inProfile=true;
    this.player.password = this.pass;
    this.playersService.update(this.player).subscribe((result: any) => { 
      Swal.fire({
        icon: 'success',
        title: 'Your password was changed succefully'
      })
    });
  }

  accessibility(){
    this.editAccessibility=true
    this.inProfile=false
  }
  editAccessibilityFunction(){
    this.editAccessibility=false;
    this.inProfile=true
    this.player.dysrhythmia = this.dysrhythmia;
    this.player.dyslexia = this.dyslexia;
    this.player.impairedVision = this.impairedVision;
    this.player.colorblindness = this.colorblindness;
    this.playersService.update(this.player).subscribe((result: any) => { 
      Swal.fire({
        icon: 'success',
        title: 'Your accessibilities were changed succefully'
      })
    });
  }

  logout(){
    window.location.reload();
  }

  statistics(){

  }
}
