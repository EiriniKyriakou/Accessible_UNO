import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Renderer2,
} from '@angular/core';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { GamesService } from 'src/app/global/services/games/game.service';
import { PlayerModel } from 'src/app/global/models/players/player.model';
import { GameModel } from 'src/app/global/models/games/game.model';
import { Router } from '@angular/router';
import { PlayersService } from 'src/app/global/services/players/players.service';

@Component({
  selector: 'app-tablegame',
  templateUrl: './tablegame.component.html',
  styleUrls: ['./tablegame.component.scss'],
})
export class TableGameComponent implements OnInit {
  public game = new GameModel();
  public players: PlayerModel[] = [];
  public cardValue: any;
  public cards: string[] = [];
  public turn: string = '';
  public length = 0;
  public number_of_cards=[0,0,0,0]
  public turns_of_players=-1;
  public reverse=false;
  public card_type="normal";
  constructor(
    private router: Router,
    private socketService: SocketsService,
    private renderer: Renderer2,
    private gamesService: GamesService,
    private playersService: PlayersService
  ) {
    this.renderer.setStyle(
      document.body,
      'background-image',
      'url(../../../assets/backgrounds/background.png)'
    );
  }

  ngOnInit() {
    this.gamesService.getActive(true).subscribe((result: any) => {
      if (JSON.stringify(result[0]) === undefined) {
        console.log('No active Game');
      } else {
        this.game = result[0];
        if (this.game.colorblindness == true){
          this.card_type = "other"
        }
        this.card_type
        this.length = this.game.players.length;
        console.log("lenght="+this.length);
        let firstCard = this.game.cards_on_deck[0];
        this.playedCard(firstCard);
        this.removeCards(this.game); //old cards of players
      }
    });

    this.socketService.subscribe('card_played', (data: any) => {
      console.log("Player Played a Card");
      this.playedCard(data.card);
      this.updatePlayer(data.player);
      this.setTurn();
    });

    this.socketService.subscribe('draw_card', (data: PlayerModel) => {
      console.log("Player Drew a Card");
      this.updatePlayer(data);
      this.updateGame();
    });

    this.socketService.subscribe('player_passed', (data: any) => {
      console.log("Player Passed")
      this.setTurn();
    });
  }

  setTurn() {
    if (!this.reverse) {
      if (this.turn === '' || this.turn === this.game.players[this.game.players.length - 1]) {
        this.turn = this.game.players[0];
        this.turns_of_players = 0;
      } else {
        this.turn = this.game.players[this.game.players.indexOf(this.turn) + 1];
        this.turns_of_players++;
      }
    } else {
      if (this.turn === '' || this.turn === this.game.players[0]) {
        this.turn = this.game.players[this.game.players.length - 1];
        this.turns_of_players = this.game.players.length - 1;
      } else {
        this.turn = this.game.players[this.game.players.indexOf(this.turn) - 1];
        this.turns_of_players--;
      }
    }
    this.socketService.publish('turn', this.turn);
    console.log('Turn: ' + this.turn);
    console.log("turns_of_players="+this.turns_of_players)
    this.game.turn = this.turn;
    let newGame = this.game;
    this.gamesService.update(newGame).subscribe((result: any) => {});
  }

  playedCard(card: any) {
    this.cards[0] = card;
    var splitted = card.split(' ', 2);
    this.setCard(splitted[0], splitted[1]);

    if(splitted[0]==="+2"){
      console.log("+2")
      this.setTurn();
      this.socketService.publish('drawTwo', this.turn);
    }
    else if(splitted[0]==="+4"){
      console.log("+4")
      this.setTurn();
      this.socketService.publish('drawFour', this.turn);
    }
    else if(splitted[0]==="skip"){
      this.setTurn();
    }
    else if(splitted[0]==="reverse"){
      if(this.length===2)
        this.setTurn();
      if(this.reverse==false)
        this.reverse=true
      else
        this.reverse=false;
    }

    setTimeout(() => {
      this.game.played_cards.push(card);
      this.game.last_card = card;
      this.game.cards_on_deck.shift();
      let newGame = this.game;
      this.gamesService.update(newGame).subscribe((result: any) => {});
    }, 1000);
  }

  setCard(num: any, des: any) {
    this.cardValue = {
      name: des,
      number: num,
    };
  }

  removeCards(current_game: { players: any }) {
    var Players = this.game.players;
    for (var player of Players) {
      this.playersService.getById(player).subscribe((result: any) => {
        this.players.push(result);
        result.cards_hand = [];
        this.playersService.update(result).subscribe((result: any) => {});
      });
    }
    console.log("The players of the game:")
    console.log(this.players);
    setTimeout(() => {
      this.dealCards(current_game);
    }, 1000);
  }

  dealCards(current_game: { players: any }) {
    var players = this.game.players;
    for (var player of players) {
      this.playersService.getById(player).subscribe((result: any) => {
        for (let i = 0; i < 7; i++) {
          result.cards_hand.push(this.game.cards_on_deck[0]);
          this.game.cards_on_deck.shift();
        }
        //console.log(result)
        this.gamesService.update(this.game).subscribe((result: any) => {});
        this.playersService.update(result).subscribe((result: any) => {});
      });
    }
    this.number_of_cards=[7,7,7,7];
    this.setTurn();
  }

  updatePlayer(data: PlayerModel) {
    let i = 0;
    for (let player of this.players) {
      if (player._id === data._id) {
        this.players[i] = data;
        this.number_of_cards[i] = data.cards_hand.length;
        console.log("Player updated");
      }
      i++;
    }
    //console.log(this.players)
  }

  updateGame(){
    this.gamesService.getActive(true).subscribe((result: any) => {
      if (JSON.stringify(result[0]) === undefined) {
        console.log('No active Game');
      } else {
        this.game = result[0];
        console.log("Game updated");
        console.log(this.game);
      }
    });
  }
}
