import { Component, OnInit, Renderer2 } from '@angular/core';
import { CardModel } from 'src/app/global/models/cards/card.model';
import { PlayerModel } from 'src/app/global/models/players/player.model';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-home',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {
  condition = false
  start = true
  red = false
  blue = false
  yellow = false
  green = false
  p1 = false;
  players: PlayerModel[] = [];
  winnerPlayer: PlayerModel | undefined;

  constructor(private renderer: Renderer2,
    private socketService: SocketsService) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background-tv-wall.png)');

    this.socketService.subscribe('card_table', (card: CardModel) => {
      this.start = false
      this.red = false
      this.blue = false
      this.yellow = false
      this.green = false
      switch (card.color) {
        case 'Red.png': {
          this.red = true;
          break;
        }
        case 'Green.png': {
          this.green = true;
          break;
        }
        case 'Blue.png': {
          this.blue = true;
          break;
        }
        case 'Yellow.png': {
          this.yellow = true;
          break;
        }
        default: {
          //statements;
          break;
        }
      }
    });
  }

  ngOnInit() {
    this.socketService.subscribe('new_game', (game: any) => {
      this.players = [];
      this.condition = false
      this.start = true
      this.red = false
      this.blue = false
      this.yellow = false
      this.green = false
      this.p1 = false;
    });

    // this.socketService.subscribe('new_start', (plr: any) => {
    //   this.players = []
    // });
    this.socketService.subscribe('quit', (plr: PlayerModel) => {
      let idx = -1;
      //εδω υπαρχει θεμα δεν γινεται remove o quit player dustuxws
      for (let i = 0; i < this.players.length; i++) {
        if (this.players[i]._id === plr._id) {
          idx = this.players.indexOf(this.players[i]);
        }
      }
      if (idx > -1) {
        this.players.splice(idx, 1);
      }
      let maxPoints = -1;
      let player = -1;
      for (let i = 0; i < this.players.length; i++) {
        if (maxPoints < this.players[i].score) {
          maxPoints = this.players[i].score;
          player = i;
        }
      }
      ///
      this.winnerPlayer = this.players[player];
      this.winnerPlayer.wins++;
      this.socketService.publish("win", this.winnerPlayer);
      this.condition = true
      this.start = true
      this.red = false
      this.blue = false
      this.yellow = false
      this.green = false



    });

    this.socketService.subscribe('start_game', (plr: PlayerModel) => {
      this.p1 = true;
      this.players.push(plr);
      // this.checkWinner(this.players);
    });

    this.socketService.subscribe("wall_update", (plr: PlayerModel) => {
      for (let i = 0; i < this.players.length; i++) {
        if (this.players[i]._id === plr._id) {
          if (this.players[i].score != plr.score) {
            this.players[i] = plr;
            this.checkWinner(this.players, plr);
          } else {
            this.players[i] = plr;
          }
        }
      }
    });

    // this.socketService.subscribe("wall_poits", (data: any) => {
    //   this.checkWinner(this.players);
    // })
  }

  checkWinner(players: PlayerModel[], plr: PlayerModel) {
    let found_winner = false;
    for (let i = 0; i < players.length; i++) {
      if (players[i].score >= 500) {
        found_winner = true;
        this.condition = true
        this.start = true
        this.red = false
        this.blue = false
        this.yellow = false
        this.green = false
        this.winnerPlayer = players[i];
        this.winnerPlayer.wins++;
        this.socketService.publish("win", this.winnerPlayer);
        break;
      }
    }
    if (found_winner == false) {
      console.log(plr);
      this.socketService.publish("win_round", plr);
    }
  }

}
