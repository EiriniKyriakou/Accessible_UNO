import { CardModel } from 'src/app/global/models/cards/card.model';
import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { GameModel } from 'src/app/global/models/games/game.model';
import { GamesService } from 'src/app/global/services/games/game.service';
@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})


export class CardComponent {

  public game = new GameModel();
  public newDeck: string[] = [];
  public plusCard = false;
  public fontClass: string = 'font';
  public type: string = 'normal'
  public test: any;
  @Input() selectedCard: CardModel | undefined;

  constructor(private gamesService: GamesService) {
    setTimeout(() => {
      if (this.selectedCard != undefined) {
        if (this.selectedCard?.dysrhythmia === true) {
          this.fontClass = 'open-dyslexic';
        }
        if (this.selectedCard?.colorblindness === true) {
          this.type = 'other';
        }

        if (this.selectedCard?.number === 'Reverse' || this.selectedCard?.number === 'Skip' || this.selectedCard?.number === 'WildCard') {
          this.test = new CardModel({
            name: this.selectedCard?.number + this.selectedCard?.color,
            number: ' ',
          });
        } else if (this.selectedCard?.number === '+2' || this.selectedCard?.number === '+4') {
          this.plusCard = true;
          this.test = new CardModel({
            name: this.selectedCard?.number + this.selectedCard?.color,
            number: this.selectedCard?.number,
          });
        }
        else {
          this.test = new CardModel({
            name: this.selectedCard?.color,
            number: this.selectedCard?.number,
          });
        }
        // this.test = new CardModel({
        //   name: this.selectedCard?.name,
        //   number: this.selectedCard?.number,
        // });

        // this.gamesService.getActive(true).subscribe((result: any) => {
        //   var current_game = result[0];

        //   if (JSON.stringify(current_game) === '[]') {
        //     console.log('empty');
        //   } else {
        //     this.game = current_game;
        //     var firstCard = current_game.cards_on_deck[0];
        //     current_game.played_cards.push(firstCard);
        //     current_game.cards_on_deck.shift();
        //     let newGame = this.game;
        //     this.gamesService.update(newGame).subscribe((result: any) => {});
        //   }
        // });
      }
    }, 1000);
  }
  ngOnInit() { }

  checkColor() {
    var ret = '';
    switch (this.selectedCard?.color) {
      case 'Red.png': {
        ret = 'letterRed';
        break;
      }
      case 'Green.png': {
        ret = 'letterGreen';
        break;
      }
      case 'Blue.png': {
        ret = 'letterBlue';
        break;
      }
      case 'Yellow.png': {
        ret = 'letterYellow';
        break;
      }
      default: {
        //statements;
        break;
      }
    }
    return ret;
  }
}
