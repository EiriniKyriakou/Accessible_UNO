import { Component, OnInit, Renderer2} from '@angular/core';
import { Router } from '@angular/router'; 
import { PlayerModel } from 'src/app/global/models/players/player.model';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { PlayersService } from 'src/app/global/services/players/players.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  sign=false
  main=false
  hourglass=false
  hided=false
  signup=false
  isSigned=false

  public player: PlayerModel[] = [];
  public username: string = '';
  public password: string = '';
  public cpassword: string = '';
  public avatar: string = '';
  public wins: number = 0;
  public games: number = 0;
  public dysrhythmia: boolean  = false;
  public dyslexia: boolean = false;
  public impairedVision: boolean = false;
  constructor(
    private router: Router,
    private playersService: PlayersService,
    private socketService: SocketsService,
    private renderer: Renderer2
  ) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
  }

  ngOnInit() { }
 
  public postPlayer(): void {
    // Emit event for update tasks
    const player = new PlayerModel();
    player.username = this.username;
    player.password = this.password;
    player.avatar = this.avatar;
    player.wins = this.wins;
    player.games = this.games;
    player.dysrhythmia = this.dysrhythmia;
    player.dyslexia = this.dyslexia;
    player.impairedVision = this.impairedVision;
    this.playersService.create(player).subscribe((result) => {
      this.username = '';
      this.password = '';
      this.avatar = '';
      this.wins = 0;
      this.games = 0;
      this.dysrhythmia = false;
      this.dyslexia = false;
      this.impairedVision = false;
      this.socketService.publish("players_update", player);
    });
  }

  public signinPlayer():void {
    const player = new PlayerModel();
    player.username = this.username;
    player.password = this.password;
    this.playersService.getByUsername(this.username).subscribe((result) => {
      var current_player = result;
      this.socketService.publish("players_update", player);
    });
  }

  signIn(){
    this.sign=true
  }

  signUp(){
    this.signup=true
    this.sign=true
  }

  signInB(){
    // this.sign=false
    // this.main=true
    // this.isSigned=true
  }

 signUpB(){
  Swal.fire('Your account is ready!', 'Sign in to start playing!', 'info')
  this.sign=true
  this.signup=false

 }
  startGame(){
    this.main=false
    this.hourglass=true
    setTimeout(() => this.changePage(), 5000);  //60s
  }

  changePage(){
    this.router.navigate(['/phonegame']);
  }

  getClickAction(_event: any) {
    // console.log(_event);
    this.hided = _event;
    if(_event) {
      this.renderer.setStyle(document.body, 'background', 'whitesmoke');

    }
    else {
      this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
    }
  }

 
 

}
