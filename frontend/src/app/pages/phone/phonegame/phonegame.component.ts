import { Component, OnInit, Renderer2 } from '@angular/core';
import { PlayerModel } from 'src/app/global/models/players/player.model';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { PlayersService } from 'src/app/global/services/players/players.service';
import { CardModel } from 'src/app/global/models/cards/card.model';
import * as myGlobals from 'src/app/pages/phone/phone.component';
import { GamesService } from 'src/app/global/services/games/game.service';
import { GameModel } from 'src/app/global/models/games/game.model';

@Component({
  selector: 'app-home',
  templateUrl: './phonegame.component.html',
  styleUrls: ['./phonegame.component.scss'],
})
export class PhoneGameComponent implements OnInit {
  my_id = myGlobals.id;
  player = new PlayerModel();
  cards: string[] = [];
  cardValue: CardModel[] = [];
  cardsReady = false;
  selectedCard: any;
  throwedCard: string = '';
  my_turn = false;
  game = new GameModel();
  drawedCard: string = '';
  timer: any;
  theTimer: any;
  changeText: boolean;
  hided = false;
  drawed = false;
  endOfTimer = false;
  choose_color=false;
  card_type="normal";

  constructor(
    private socketService: SocketsService,
    private renderer: Renderer2,
    private playersService: PlayersService,
    private gamesService: GamesService
  ) {
    this.renderer.setStyle(
      document.body,
      'background-image',
      'url(../../../assets/backgrounds/background.png)'
    );
    this.changeText = false;
  }

  ngOnInit() {
    console.log('My id ' + this.my_id);
    this.socketService.subscribe('turn', (data: any) => {
      this.drawed = false;
      this.endOfTimer = false;
      clearInterval(this.theTimer);
      if (data != this.my_id) {
        this.my_turn = false;
      } else {
        this.my_turn = true;
        this.startTimer(1);
      }
    });
    setTimeout(() => {
      this.playersService.getById(this.my_id).subscribe((result: any) => {
        console.log("I'm the player:");
        console.log(result);
        if (JSON.stringify(result) === undefined) {
          console.log('error');
        } else {
          this.player = result;
          this.cards = result.cards_hand;
          if (this.player.colorblindness === true){
            this.card_type="other";
          }
          
          //console.log(this.cards)
          var i = 0;
          for (var card of this.cards) {
            var splitted = card.split(' ', 2);
            this.setCard(splitted[0], splitted[1], i,this.player.dysrhythmia);
            i++;
          }
        }
      });
      this.cardsReady = true;
      clearInterval(this.theTimer);
      this.startTimer(1);
    }, 6000);


    this.socketService.subscribe('drawTwo', (data: any) => {
      console.log("Player Passed +2")
      console.log(data)
      if(this.my_id===data){
      this.drawCard(2);
      }
    });
    
    this.socketService.subscribe('drawFour', (data: any) => {
      console.log("Player Passed +4")
      console.log(data)
      if(this.my_id===data){
      this.drawCard(4);
      }
    });


  }

  onMouseEnter(hoverCard: HTMLElement, index: any) {
    hoverCard.style.marginTop = '-12%';
    this.selectedCard = index;
  }

  onMouseOut(hoverCard: HTMLElement) {
    hoverCard.style.marginTop = '0%';
  }

  drawCard(num:number) {
    this.gamesService.getActive(true).subscribe((result: any) => {
      if (JSON.stringify(result[0]) === undefined) {
        console.log('No active Game');
      } else {
        this.game = result[0];
        console.log("The game (before i draw a card):")
        console.log(this.game);
        for(let i=0;i<num;i++){
          let tokenCard = this.game.cards_on_deck[0];
          this.cards.push(tokenCard);
          var splitted = tokenCard.split(' ', 2);
          this.setCard(splitted[0], splitted[1], this.cardValue.length,this.player.dysrhythmia);
          this.game.cards_on_deck.shift();
        }

        this.gamesService.update(this.game).subscribe((result: any) => {
          this.playersService.update(this.player).subscribe((result: any) => {
            this.socketService.publish('draw_card', this.player);
            console.log('I draw');
            if (this.endOfTimer===true){
              this.pass();
            }
          });
        });
        this.player.cards_hand = this.cards;
        this.drawed = true;
      }
    });
  }

  pass() {
    this.drawed = false;
    this.socketService.publish('player_passed', "");
    console.log('I pass');
  }

  throwCard() {
    this.drawed = false;
    this.throwedCard = this.cards[this.selectedCard];
    console.log(this.throwedCard )
    if(this.throwedCard ==="+4 WildCard4.png" || this.throwedCard ==="normal WildCard.png"){
      this.choose_color = true;
    }else{
      this.throw();
    }
  }

  throw(){
    //peta to apo to front
    this.cardValue.splice(this.selectedCard, 1);
    // this.player.cards_hand=this.cardValue;
    this.cards.splice(this.selectedCard, 1);
    this.player.cards_hand = this.cards;
    this.playersService.update(this.player).subscribe((result: any) => {
      let tmp = {
        card: this.throwedCard,
        player: this.player,
      };
      this.socketService.publish('card_played', tmp);
      console.log("I throw a card");
    });
    this.selectedCard = null;
    //console.log(this.selectedCard);
  }

  startTimer(minute: number) {
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;
    const prefix = minute < 10 ? '0' : '';
    this.theTimer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.timer = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log('End of timer');
        clearInterval(this.theTimer);
        this.endOfTimer = true;
        if ( this.drawed === false ){
          this.drawCard(1);
        }else {
          this.pass();
        }
      }
    }, 1000);
  }

  getClickAction(_event: any) {
    this.hided = _event;
    if (_event) {
      this.renderer.setStyle(document.body, 'background', 'whitesmoke');
    } else {
      this.renderer.setStyle(
        document.body,
        'background-image',
        'url(../../../assets/backgrounds/background.png)'
      );
    }
  }

  setCard(num: any, des: any, index: number,dyshr:boolean) {
    this.cardValue[index] = {
      name: des,
      number: num,
      dysrhythmia:dyshr
      
    };
    //console.log(this.cardValue[index])
  }

  WildCardGreen(){
    this.choose_color=false;
    console.log(this.throwCard);
    if(this.throwedCard ==="+4 WildCard4.png"){
      this.throwedCard = "+4 WildCard4Green.png"
    }else if(this.throwedCard ==="normal WildCard.png"){
      this.throwedCard = "normal WildCardGreen.png"
    }
    this.throw();
  }

  WildCardBlue(){
    this.choose_color=false;
    console.log(this.throwCard);
    if(this.throwedCard ==="+4 WildCard4.png"){
      this.throwedCard = "+4 WildCard4Blue.png"
    }else if(this.throwedCard ==="normal WildCard.png"){
      this.throwedCard = "normal WildCardBlue.png"
    }
    this.throw();
  }
  WildCardRed(){
    this.choose_color=false;
    console.log(this.throwCard);
    if(this.throwedCard ==="+4 WildCard4.png"){
      this.throwedCard = "+4 WildCard4Red.png"
    }else if(this.throwedCard ==="normal WildCard.png"){
      this.throwedCard = "normal WildCardRed.png"
    }
    this.throw();
  }
  WildCardYellow(){
    this.choose_color=false;
    console.log(this.throwCard);
    if(this.throwedCard ==="+4 WildCard4.png"){
      this.throwedCard = "+4 WildCard4Yellow.png"
    }else if(this.throwedCard ==="normal WildCard.png"){
      this.throwedCard = "normal WildCardYellow.png"
    }
    this.throw();
  }


}
