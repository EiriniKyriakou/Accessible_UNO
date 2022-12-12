import { Component, OnInit,  Input, Output, EventEmitter,Renderer2} from '@angular/core';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { GamesService } from 'src/app/global/services/games/game.service';
import { PlayerModel } from 'src/app/global/models/players/player.model';
import { GameModel } from 'src/app/global/models/games/game.model';
import { Router } from '@angular/router'; 
import { CardModel } from 'src/app/global/models/cards/card.model';

@Component({
  selector: 'app-tablegame',
  templateUrl: './tablegame.component.html',
  styleUrls: ['./tablegame.component.scss']
})
export class TableGameComponent implements OnInit {
  public game = new GameModel();
  public cardValue:any;

  constructor(
    private router: Router, 
    private socketService: SocketsService,
    private renderer: Renderer2,
    private gamesService: GamesService) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
  }

  ngOnInit() {

    this.gamesService.getActive(true).subscribe((result:any) => {
      var current_game = result[0];
  
      if(JSON.stringify(current_game) === "[]"){
        console.log("empty")
      }else{
        this.game = current_game;
        var firstCard=current_game.cards_on_deck[0];
        var splitted = firstCard.split(" ", 2); 
        this.setCard(splitted[0],splitted[1]);
      }
    });

   

  }

  setCard(num: any,des: any,){
    this.cardValue={
      name:des,
      number:num
    }
  }
  
}
