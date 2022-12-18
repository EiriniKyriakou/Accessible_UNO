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
import { CardModel } from 'src/app/global/models/cards/card.model';
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
  cards: string[] = [];
  public turn: string = '';

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
        let firstCard = this.game.cards_on_deck[0];
        console.log(this.game)
        console.log(firstCard)
        this.playedCard(firstCard);
        this.removeCards(this.game); //old cards of players
        this.setTurn();
      }
    });

    this.socketService.subscribe('card_played', (data: any) => {
      this.playedCard(data.card);
      this.updatePlayer(data.player);
      this.setTurn();
    });

    this.socketService.subscribe('draw_card', (data: PlayerModel) => {
      console.log(data);
      this.updatePlayer(data);
    });

    this.socketService.subscribe('player_passed', (data: PlayerModel) => {
      console.log("socket pass!")
      this.setTurn();
    });
  }

  setTurn() {
    if (
      this.turn === '' ||
      this.turn === this.game.players[this.game.players.length - 1]
    ) {
      this.turn = this.game.players[0];
      this.socketService.publish('turn', this.turn);
    } else {
      this.turn = this.game.players[this.game.players.indexOf(this.turn) + 1];
      this.socketService.publish('turn', this.turn);
    }
    console.log('Turn: ' + this.turn);
    this.game.turn = this.turn;
    let newGame = this.game;
    this.gamesService.update(newGame).subscribe((result: any) => {});
  }

  playedCard(card: any) {
    this.cards[0] = card;
    var splitted = card.split(' ', 2);
    this.setCard(splitted[0], splitted[1]);
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
  }

  updatePlayer(data: PlayerModel) {
    let i = 0;
    for (let player of this.players) {
      if (player._id === data._id) {
        this.players[i] = data;
        console.log("Player updated");
      }
      i++;
    }
    console.log(this.players)
  }
}
