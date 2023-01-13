import { Component, OnInit, Renderer2, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; 
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { GamesService } from 'src/app/global/services/games/game.service';
import { PlayerModel } from 'src/app/global/models/players/player.model';
import { GameModel } from 'src/app/global/models/games/game.model';
import { PlayersService } from 'src/app/global/services/players/players.service';

@Component({
  selector: 'app-tablewaiting',
  templateUrl: './tablewaiting.component.html',
  styleUrls: ['./tablewaiting.component.scss']
})
export class TableWaitingComponent implements OnInit { 
  public game = new GameModel();
  //public players: string[] = [];

  constructor(
    private router: Router, 
    private socketService: SocketsService,
    private renderer: Renderer2,
    private gamesService: GamesService,
    private playersService: PlayersService) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
  }

  ngOnInit() {
    setTimeout(() => this.changePage(), 60000);  //60s
    setTimeout(() => {
      this.gamesService.getActive(true).subscribe((result:any) => {
        if(JSON.stringify(result) === "[]"){
          console.log("No active game")
        }else{
          this.game = result[0];
        }
      });

      this.socketService.subscribe("player_joined", (data: any) => {
        
        this.game.players.push(data._id);
        console.log("Joined player: " + data._id)
        if(data.dysrhythmia===true){
          this.game.dysrhythmia = true;
        }
        if (data.dyslexia === true){
          this.game.dyslexia = true;
        }
        if (data.impairedVision === true){
          this.game.impairedVision = true;
        }
        if (data.colorblindness == true){
          this.game.colorblindness = true;
        }
      });
    },1000);
    
  }

  changePage(){
    //let newGame=this.game;
    console.log(this.game)
    //newGame.players=this.players;
    this.gamesService.update(this.game).subscribe((result:any) => {
    });
    this.socketService.publish("game_start", this.game);
    setTimeout(() => {this.router.navigate(['/tablegame']);},1000);
  }
}
