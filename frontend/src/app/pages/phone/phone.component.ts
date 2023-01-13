import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerModel } from 'src/app/global/models/players/player.model';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { PlayersService } from 'src/app/global/services/players/players.service';
import { GamesService } from 'src/app/global/services/games/game.service';

import Swal from 'sweetalert2';
export var id = "0";

@Component({
  selector: 'app-home',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  sign = false
  main = false
  hourglass = false
  hided = false
  signup = false
  isSigned = false
  join = false;
  game_id = "";
  my_id = "";

  public player = new PlayerModel();
  public username: string = '';
  public password: string = '';
  public cpassword: string = '';
  public avatar: string = '';
  public wins: number = 0;
  public games: number = 0;
  public dysrhythmia: boolean = false;
  public dyslexia: boolean = false;
  public impairedVision: boolean = false;
  public colorblindness: boolean = false;
  public unos: number = 0;
  public wild_cards: number = 0;
  public score: number = 0;
  public cards_hand: string[] = [];
  public fontClass: string = 'font';
  public isDisabled: boolean = false;
  constructor(
    private router: Router,
    private playersService: PlayersService,
    private socketService: SocketsService,
    private renderer: Renderer2,
    private gamesService: GamesService
  ) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
  }

  ngOnInit() { }

  public postPlayer(): void {
    // Emit event for update tasks
    this.player.username = this.username;
    this.player.password = this.password;
    this.player.avatar = this.avatar;
    this.player.wins = this.wins;
    this.player.games = this.games;
    this.player.dysrhythmia = this.dysrhythmia;
    this.player.dyslexia = this.dyslexia;
    this.player.impairedVision = this.impairedVision;
    this.player.colorblindness = this.colorblindness;
    this.player.unos = this.unos;
    this.player.wild_cards = this.wild_cards;
    this.player.score = this.score;
    this.player.cards_hand = this.cards_hand;

    this.playersService.create(this.player).subscribe((result) => {
      this.username = '';
      this.password = '';
      this.avatar = '';
      this.wins = 0;
      this.games = 0;
      this.dysrhythmia = false;
      this.dyslexia = false;
      this.impairedVision = false;
      this.colorblindness = false;

      this.socketService.publish("players_create", this.player);
    });
  }


  public signinPlayer(): void {
    const player = new PlayerModel();
    player.username = this.username;
    player.password = this.password;

    this.playersService.getByUsername(this.username, this.password).subscribe((result) => {
      if (JSON.stringify(result) === "[]") {
        console.log("Wrong username or password!")
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Wrong username or password!',
        })
      } else {

        this.socketService.publish("players_signin", player);
        this.player = result[0];
        this.my_id = result[0]._id;
        //console.log("This player signed in: ")
        //console.log(this.player)
        if (this.player.dyslexia === true) {
          this.fontClass = 'open-dyslexic';
        }
        this.signInB();
      }
    });
  }

  signIn() {
    this.sign = true
    this.signup = false
  }

  signUp() {
    this.signup = true
    this.sign = true
  }

  signInB() {
    this.sign = false
    this.isSigned = true
    this.main = true
    this.socketService.subscribe("games_create", (data: any) => {
      console.log(data)
      this.gamesService.getActive(true).subscribe((result) => {
        var current_game = result;
        this.game_id = result[0]._id;
        console.log("Active game with id: ")
        console.log(this.game_id);
      });
      this.joinGameOption();
    });
    this.gamesService.getActive(true).subscribe((result) => {
      var current_game = result;
      ///console.log(this.game_id);
      //console.log(JSON.stringify(current_game));
      if (JSON.stringify(current_game) === "[]") {
        console.log("No Active Game")
      } else {
        this.game_id = result[0]._id;
        this.joinGameOption();
      }
    });
  }

  joinGameOption() {
    this.join = true;
  }

  signUpB() {
    Swal.fire('Your account is ready!', 'Sign in to start playing!', 'info')
    this.sign = true
    this.signup = false
  }
  startGame() {
    this.isDisabled = true;
    this.gamesService.getById(this.game_id).subscribe((result) => {
      //console.log(this.player)
      this.playersService.getById(this.my_id).subscribe((result) => {
        this.player = result;
        console.log(this.player.username)
        this.socketService.publish("player_joined", this.player);
      });
      //console.log(this.my_id)
    });
    this.main = false
    this.hourglass = true
    this.socketService.subscribe("game_start", (data: any) => {
      this.changePage()
    });
    // setTimeout(() => this.changePage(), 5000);  //60s
  }

  changePage() {
    id = this.player._id;
    this.router.navigate(['/phonegame']);
  }

  getClickAction(_event: any) {
    // console.log(_event);
    this.hided = _event;
    if (_event) {
      this.renderer.setStyle(document.body, 'background', 'whitesmoke');

    }
    else {
      this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
    }
  }




}
