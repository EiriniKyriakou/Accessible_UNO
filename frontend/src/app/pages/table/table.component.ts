import { Component, OnInit,Renderer2 } from '@angular/core';
import { Router } from '@angular/router'; 
import { GameModel } from 'src/app/global/models/games/game.model';
import { GamesService } from 'src/app/global/services/games/game.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public game: GameModel[] = [];
  public cards_on_deck: string[] = [];
  public played_cards: string[] =[];
  public turn: string = '';
  public last_card: string = '';
  public current_player: string = '';
  public dysrhythmia: boolean  = false;
  public dyslexia: boolean  = false;
  public impairedVision: boolean  = false;

  constructor(
      private renderer: Renderer2, 
      private router: Router,
      private gamesService: GamesService,
      private socketService: SocketsService,) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
  }

  ngOnInit() { }

  public postGame(): void {
    // Emit event for update tasks
    const game = new GameModel();
    game.cards_on_deck = ["+4","+2 red"];
    game.played_cards =[];
    game.turn = '';
    game.last_card = '';
    game.current_player = '';
    game.dysrhythmia = false;
    game.dyslexia = false;
    game.impairedVision = false;

    this.gamesService.create(game).subscribe((result) => {
      this.cards_on_deck = ["+4","+2 red"];
      this.played_cards =[];
      this.turn = '';
      this.last_card = '';
      this.current_player = '';
      this.dysrhythmia = false;
      this.dyslexia = false;
      this.impairedVision = false;

      this.socketService.publish("games_update", game);
    });
  }

  startGame($myParam: string = ''): void {
    this.postGame();

    const navigationDetails: string[] = ['/tablewaiting'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

}
