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

    // setTimeout(()=>{ 
    //                 this.condition=true
    //                 //this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/winbackground.png)');
    //                }
    // ,10000);

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

    this.socketService.subscribe('new_start', (plr: any) => {
      this.players = []
    });
    this.socketService.subscribe('start_game', (plr: PlayerModel) => {
      this.p1 = true;
      this.players.push(plr);
      this.checkWinner(this.players);
    });


  }

  checkWinner(players: PlayerModel[]) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].score >= 500) {
        this.condition = true
        this.start = true
        this.red = false
        this.blue = false
        this.yellow = false
        this.green = false
        this.winnerPlayer = players[i];
      }
    }
  }

}
