import {Component, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {GameModel} from 'src/app/global/models/games/game.model';
import {GamesService} from 'src/app/global/services/games/game.service';
import {SocketsService} from 'src/app/global/services/sockets/sockets.service';
import arrayShuffle from 'array-shuffle';

@Component({selector: 'app-table', templateUrl: './table.component.html', styleUrls: ['./table.component.scss']})
export class TableComponent implements OnInit {
    public game : GameModel[] = [];
    public cards_on_deck : string[] = [];
    public played_cards : string[] = [];
    public players : string[] = [];
    public turn : string = '';
    public last_card : string = '';
    public current_player : string = '';
    public dysrhythmia : boolean = false;
    public dyslexia : boolean = false;
    public impairedVision : boolean = false;
    public active : boolean = true;

    constructor(private renderer : Renderer2, private router : Router, private gamesService : GamesService, private socketService : SocketsService) {
        this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
    }

    ngOnInit() {}

    public postGame(): void { // Emit event for update tasks
        const game = new GameModel();
        game.cards_on_deck = arrayShuffle([
            '0 Red.png',
            '0 Yellow.png',
            '0 Green.png',
            '0 Blue.png',
            '1 Red.png',
            '1 Yellow.png',
            '1 Green.png',
            '1 Blue.png',
            '1 Red.png',
            '1 Yellow.png',
            '1 Green.png',
            '1 Blue.png',
            '2 Red.png',
            '2 Yellow.png',
            '2 Green.png',
            '2 Blue.png',
            '2 Red.png',
            '2 Yellow.png',
            '2 Green.png',
            '2 Blue.png',
            '3 Red.png',
            '3 Yellow.png',
            '3 Green.png',
            '3 Blue.png',
            '3 Red.png',
            '3 Yellow.png',
            '3 Green.png',
            '3 Blue.png',
            '4 Red.png',
            '4 Yellow.png',
            '4 Green.png',
            '4 Blue.png',
            '4 Red.png',
            '4 Yellow.png',
            '4 Green.png',
            '4 Blue.png',
            '5 Red.png',
            '5 Yellow.png',
            '5 Green.png',
            '5 Blue.png',
            '5 Red.png',
            '5 Yellow.png',
            '5 Green.png',
            '5 Blue.png',
            '6 Red.png',
            '6 Yellow.png',
            '6 Green.png',
            '6 Blue.png',
            '6 Red.png',
            '6 Yellow.png',
            '6 Green.png',
            '6 Blue.png',
            '7 Red.png',
            '7 Yellow.png',
            '7 Green.png',
            '7 Blue.png',
            '7 Red.png',
            '7 Yellow.png',
            '7 Green.png',
            '7 Blue.png',
            '8 Red.png',
            '8 Yellow.png',
            '8 Green.png',
            '8 Blue.png',
            '8 Red.png',
            '8 Yellow.png',
            '8 Green.png',
            '8 Blue.png',
            '9 Red.png',
            '9 Yellow.png',
            '9 Green.png',
            '9 Blue.png',
            '9 Red.png',
            '9 Yellow.png',
            '9 Green.png',
            '9 Blue.png',
            'reverse ReverseRed.png',
            'reverse ReverseYellow.png',
            'reverse ReverseGreen.png',
            'reverse ReverseBlue.png',
            'reverse ReverseRed.png',
            'reverse ReverseYellow.png',
            'reverse ReverseGreen.png',
            'reverse ReverseBlue.png',
            'skip SkipRed.png',
            'skip SkipYellow.png',
            'skip SkipGreen.png',
            'skip SkipBlue.png',
            'skip SkipRed.png',
            'skip SkipYellow.png',
            'skip SkipGreen.png',
            'skip SkipBlue.png',
            '+2 RedDraw.png',
            '+2 YellowDraw.png',
            '+2 GreenDraw.png',
            '+2 BlueDraw.png',
            '+2 RedDraw.png',
            '+2 YellowDraw.png',
            '+2 GreenDraw.png',
            '+2 BlueDraw.png',
            'normal WildCard.png',
            'normal WildCard.png',
            'normal WildCard.png',
            'normal WildCard.png',
            '+4 WildCard4.png',
            '+4 WildCard4.png',
            '+4 WildCard4.png',
            '+4 WildCard4.png',
        ]);
        game.played_cards = [];
        game.players = [];
        game.turn = '';
        game.last_card = '';
        game.current_player = '';
        game.dysrhythmia = false;
        game.dyslexia = false;
        game.impairedVision = false;
        game.active = true;

        this.gamesService.create(game).subscribe((result) => {
            this.played_cards = [
                '0 Red.png',
                '0 Yellow.png',
                '0 Green.png',
                '0 Blue.png',
                '1 Red.png',
                '1 Yellow.png',
                '1 Green.png',
                '1 Blue.png',
                '1 Red.png',
                '1 Yellow.png',
                '1 Green.png',
                '1 Blue.png',
                '2 Red.png',
                '2 Yellow.png',
                '2 Green.png',
                '2 Blue.png',
                '2 Red.png',
                '2 Yellow.png',
                '2 Green.png',
                '2 Blue.png',
                '3 Red.png',
                '3 Yellow.png',
                '3 Green.png',
                '3 Blue.png',
                '3 Red.png',
                '3 Yellow.png',
                '3 Green.png',
                '3 Blue.png',
                '4 Red.png',
                '4 Yellow.png',
                '4 Green.png',
                '4 Blue.png',
                '4 Red.png',
                '4 Yellow.png',
                '4 Green.png',
                '4 Blue.png',
                '5 Red.png',
                '5 Yellow.png',
                '5 Green.png',
                '5 Blue.png',
                '5 Red.png',
                '5 Yellow.png',
                '5 Green.png',
                '5 Blue.png',
                '6 Red.png',
                '6 Yellow.png',
                '6 Green.png',
                '6 Blue.png',
                '6 Red.png',
                '6 Yellow.png',
                '6 Green.png',
                '6 Blue.png',
                '7 Red.png',
                '7 Yellow.png',
                '7 Green.png',
                '7 Blue.png',
                '7 Red.png',
                '7 Yellow.png',
                '7 Green.png',
                '7 Blue.png',
                '8 Red.png',
                '8 Yellow.png',
                '8 Green.png',
                '8 Blue.png',
                '8 Red.png',
                '8 Yellow.png',
                '8 Green.png',
                '8 Blue.png',
                '9 Red.png',
                '9 Yellow.png',
                '9 Green.png',
                '9 Blue.png',
                '9 Red.png',
                '9 Yellow.png',
                '9 Green.png',
                '9 Blue.png',
                'reverse ReverseRed.png',
                'reverse ReverseYellow.png',
                'reverse ReverseGreen.png',
                'reverse ReverseBlue.png',
                'reverse ReverseRed.png',
                'reverse ReverseYellow.png',
                'reverse ReverseGreen.png',
                'reverse ReverseBlue.png',
                'skip SkipRed.png',
                'skip SkipYellow.png',
                'skip SkipGreen.png',
                'skip SkipBlue.png',
                'skip SkipRed.png',
                'skip SkipYellow.png',
                'skip SkipGreen.png',
                'skip SkipBlue.png',
                '+2 RedDraw.png',
                '+2 YellowDraw.png',
                '+2 GreenDraw.png',
                '+2 BlueDraw.png',
                '+2 RedDraw.png',
                '+2 YellowDraw.png',
                '+2 GreenDraw.png',
                '+2 BlueDraw.png',
                'normal WildCard.png',
                'normal WildCard.png',
                'normal WildCard.png',
                'normal WildCard.png',
                '+4 WildCard4.png',
                '+4 WildCard4.png',
                '+4 WildCard4.png',
                '+4 WildCard4.png',
            ];
            this.turn = '';
            this.players = [];
            this.last_card = '';
            this.current_player = '';
            this.dysrhythmia = false;
            this.dyslexia = false;
            this.impairedVision = false;
            this.active = true;

            this.socketService.publish('games_create', game);
        });
    }

    startGame($myParam : string = ''): void {
        this.inactiveGames();

        const navigationDetails: string[] = ['/tablewaiting'];
        if ($myParam.length) {
            navigationDetails.push($myParam);
        }
        this.router.navigate(navigationDetails);
    }

    inactiveGames(){
        this.gamesService.getActive(true).subscribe((result:any) => {

            if(JSON.stringify(result) === "[]"){
              console.log("No Active Games");
              console.log("Post game");
              this.postGame();
            }else{
                let i=-1;
                let length = result.length-1;
                for(let active_game of result){
                    active_game.active = false;
                    this.gamesService.update(active_game).subscribe((result:any) => {
                        i++;
                        if (i === length){
                            console.log("Post game");
                            this.postGame();
                        }
                    });
                }
            }
          });
    }
}
