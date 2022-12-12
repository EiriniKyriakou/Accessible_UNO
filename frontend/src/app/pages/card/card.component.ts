import {CardModel} from 'src/app/global/models/cards/card.model';
import {Component, OnInit, Renderer2, Input} from '@angular/core';
import {SocketsService} from 'src/app/global/services/sockets/sockets.service';
import {GameModel} from 'src/app/global/models/games/game.model';
import {GamesService} from 'src/app/global/services/games/game.service';
@Component({selector: 'card', templateUrl: './card.component.html', styleUrls: ['./card.component.css']})
export class CardComponent {
    // protected selectedCard: CardModel = new CardModel({
    //     name: "Red.png",
    //     number:"5"
    // });
    public game = new GameModel();

    public newDeck : string[] = [];

    @Input()selectedCard : CardModel | undefined;
    test : any;
    constructor(private gamesService : GamesService) {
        setTimeout(() => {
            if (this.selectedCard != undefined) {
                this.test = new CardModel({
                    name: this.selectedCard ?. name,
                    number: this.selectedCard ?. number
                });

                this.gamesService.getActive(true).subscribe((result : any) => {
                    var current_game = result[0];

                    if (JSON.stringify(current_game) === '[]') {
                        console.log('empty');
                    } else {
                        this.game = current_game;
                        var firstCard = current_game.cards_on_deck[0];
                        console.log(firstCard);
                        current_game.played_cards.push(firstCard);
                        console.log(current_game.played_cards);
                        current_game.cards_on_deck.shift();
                        console.log(current_game.cards_on_deck);
                        let newGame = this.game;
                        this.gamesService.update(newGame).subscribe((result : any) => {});
                    }
                });


            }
        }, 1000);
    }
}
