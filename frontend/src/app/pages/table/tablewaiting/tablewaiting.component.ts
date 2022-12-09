import { Component, OnInit, Renderer2, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; 
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { GamesService } from 'src/app/global/services/games/game.service';
import { PlayerModel } from 'src/app/global/models/players/player.model';
import { GameModel } from 'src/app/global/models/games/game.model';

@Component({
  selector: 'app-tablewaiting',
  templateUrl: './tablewaiting.component.html',
  styleUrls: ['./tablewaiting.component.scss']
})
export class TableWaitingComponent implements OnInit { 
  public game = new GameModel();
  public players: string[] = [];

  constructor(
    private router: Router, 
    private socketService: SocketsService,
    private renderer: Renderer2,
    private gamesService: GamesService) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
  }

  ngOnInit() {
    setTimeout(() => this.changePage(), 60000);  //60s
    this.socketService.subscribe("player_joined", (data: any) => {
      this.players[Object.keys(this.players).length] = data;
      //console.log(this.players)
    });
  }

  changePage(){
    console.log(this.players)
    // this.gamesService.update(this.game).subscribe((result) => {
    // });
    this.router.navigate(['/tablegame']);
  }
}
