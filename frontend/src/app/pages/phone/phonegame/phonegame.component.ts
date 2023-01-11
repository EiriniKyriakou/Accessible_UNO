import { Component, OnInit, Renderer2 } from '@angular/core';
import { PlayerModel } from 'src/app/global/models/players/player.model';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { PlayersService } from 'src/app/global/services/players/players.service';
import { CardModel } from 'src/app/global/models/cards/card.model';
import * as myGlobals from 'src/app/pages/phone/phone.component';
import { GamesService } from 'src/app/global/services/games/game.service';
import { GameModel } from 'src/app/global/models/games/game.model';
import { Router } from '@angular/router';
import { SmartSpeakerService } from 'src/app/global/services/smart-speaker/smart-speaker.service';
import Swal from 'sweetalert2';

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
  choose_color = false;
  card_type = 'normal';
  symbol = '';
  color = '';
  end_of_round = false;
  unoClicked = false;
  fontClass: string = 'font';
  cardsClass: string = 'cards';
  cb = false;

  constructor(
    private socketService: SocketsService,
    private renderer: Renderer2,
    private playersService: PlayersService,
    private gamesService: GamesService,
    private router: Router,
    private smartSpeaker: SmartSpeakerService
  ) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
    this.changeText = false;

  }

  ngOnInit() {
    this.smartSpeaker.initialize();
    this.smartSpeaker.start();


    //console.log('My id ' + this.my_id);
    setTimeout(() => {
      this.playersService.getById(this.my_id).subscribe((result: any) => {
        if (JSON.stringify(result) === undefined) {
          console.log('error');
        } else {
          this.player = result;
          this.cards = this.player.cards_hand;
          console.log("I'm the player:");
          console.log(this.player);
          if (this.player.colorblindness === true) {
            this.card_type = 'other';
            this.cb = true;
          }

          if (this.player.dyslexia === true) {
            this.fontClass = 'open-dyslexic';
          }
          var i = 0;
          for (let card of this.cards) {
            let splitted = card.split(' ', 2);
            this.setCard(splitted[0], splitted[1], i, this.player.dysrhythmia, this.player.colorblindness, this.player.dyslexia);
            i++;
          }
        }
      });
      this.cardsReady = true;
      clearInterval(this.theTimer);
      this.startTimer(1);
    }, 6000);

    this.socketService.subscribe('turn', (data: any) => {
      this.drawed = false;
      this.endOfTimer = false;
      clearInterval(this.theTimer);
      if (data != this.my_id) {
        this.my_turn = false;
      } else {
        this.my_turn = true;
        // console.log("On my turn:")
        // console.log(this.player.cards_hand);
        // console.log(this.cards);
        // console.log(this.cardValue);
        this.startTimer(1);
      }
    });

    this.socketService.subscribe('drawTwo', (id: any) => {
      console.log('Player Passed +2');
      //console.log(data);
      if (this.my_id === id) {
        this.drawCard(2);
      }
    });

    this.socketService.subscribe('drawFour', (id: any) => {
      console.log('Player Passed +4');
      if (this.my_id === id) {
        this.drawCard(4);
      }
    });

    this.socketService.subscribe('penalty', (id: any) => {
      console.log("Penalty")
      if (this.my_id === id) {
        this.drawCard(2);
      }
    });

    this.socketService.subscribe('card_table', (card: CardModel) => {
      this.symbol = card.number;
      this.color = card.color;
      console.log('Card on table: ' + this.symbol + ' ' + this.color)
    });

    this.socketService.subscribe('won_round', (data: any) => {
      console.log('Player with id = ' + data._id + 'won the round');
      this.end_of_round = true;
      this.my_turn = false;
      if (data._id != this.my_id) {
        Swal.fire({
          title: 'Better Luck Next Time',
          html: 'You won this round. <br>Next Round will start in a few seconds!',
          imageUrl: 'https://cdn-icons-png.flaticon.com/512/4372/4372342.png',
          imageWidth: 200,
          imageHeight: 100,
          timer: 30000,
          showConfirmButton: false,
        }).then(() => {
          this.unoClicked = false;
          this.socketService.publish('start_round', this.my_id);
        });
      }
    });

    this.socketService.subscribe('start_round', (id: any) => {
      console.log('Start round');
      this.cards = [];
      this.cardValue = [];
      this.cardsReady = false;
      setTimeout(() => {
        this.playersService.getById(this.my_id).subscribe((result: any) => {
          if (JSON.stringify(result) === undefined) {
            console.log('error');
          } else {
            this.player = result;
            this.cards = this.player.cards_hand;
            //console.log("I'm the player:");
            //console.log(this.player);
            var i = 0;
            for (let card of this.cards) {
              let splitted = card.split(' ', 2);
              this.setCard(splitted[0], splitted[1], i, this.player.dysrhythmia, this.player.colorblindness, this.player.dyslexia);
              i++;
            }
          }
        });
        this.cardsReady = true;
        clearInterval(this.theTimer);
        this.startTimer(1);
      }, 6000);
    });

    this.socketService.subscribe('win', (data: any) => {
      this.playersService.update(this.player).subscribe((result: any) => {
        setTimeout(() => { this.router.navigate(['/phone']); }, 1000);
      });
    });

    this.socketService.subscribe('phone_player_update', (data: any) => {
      this.playersService.getById(this.my_id).subscribe((result: any) => {
        if (JSON.stringify(result) === undefined) {
          console.log('error');
        } else {
          this.player = result;
        }
      });
    });

    //bro why you do not work!?!?
    // this.smartSpeaker.addCommand('hi', () => {
    //   console.log("eisai mortisa")
    //   //this.uno();
    // });

  }

  onMouseEnter(hoverCard: HTMLElement, index: any) {
    if (this.cards.length == 1) {
      hoverCard.style.marginTop = '-1%';
    }
    else {
      hoverCard.style.marginTop = '-12%';
    }
    if (this.player.impairedVision == true) {
      this.smartSpeaker.speak('Card is' + this.cardValue[index].number + "and" + this.cardValue[index].color.replace(".png", ""));
    }
    this.selectedCard = index;
  }

  onMouseOut(hoverCard: HTMLElement) {
    hoverCard.style.marginTop = '0%';
  }

  drawCard(num: number) {
    this.unoClicked = false;
    this.gamesService.getActive(true).subscribe((result: any) => {
      if (JSON.stringify(result[0]) === undefined) {
        console.log('No active Game');
      } else {
        this.game = result[0];
        //console.log('The game (before i draw a card):');
        //console.log(this.game);
        for (let i = 0; i < num; i++) {
          let tokenCard = this.game.cards_on_deck[0];
          this.cards.push(tokenCard);
          this.player.cards_hand = this.cards;
          var splitted = tokenCard.split(' ', 2);
          this.setCard(splitted[0], splitted[1], this.cardValue.length, this.player.dysrhythmia, this.player.colorblindness, this.player.dyslexia);
          this.game.cards_on_deck.shift();
        }

        this.gamesService.update(this.game).subscribe((result: any) => {
          this.playersService.update(this.player).subscribe((result: any) => {
            let tmp = {
              player: this.player,
              number_of_cards: num
            }
            this.socketService.publish('draw_card', tmp);
            //console.log('I draw');
            if (this.endOfTimer === true) {
              this.pass();
            }
          });
        });
        this.drawed = true;
      }
    });


    if (this.cards.length < 7) {
      this.cardsClass = 'cards'
    }
    if (this.cards.length > 7) {
      this.cardsClass = 'cardsmoreseven'
    }
    if (this.cards.length > 12) {
      this.cardsClass = 'cardsmorenine'
    }

  }

  pass() {
    this.drawed = false;
    this.socketService.publish('player_passed', this.player);
    //console.log('I pass');
  }

  throwCard() {
    this.drawed = false;
    this.throwedCard = this.cards[this.selectedCard];
    console.log("Card I'm about to throw: " + this.throwedCard);
    if (this.throwedCard === '+4 All.png' || this.throwedCard === 'WildCard All.png') {
      this.choose_color = true;
    } else {
      this.throw();
    }
    if (this.cards.length < 7) {
      this.cardsClass = 'cards'
    }
    if (this.cards.length > 7) {
      this.cardsClass = 'cardsmoreseven'
    }
    if (this.cards.length > 12) {
      this.cardsClass = 'cardsmorenine'
    }

  }

  throw() {
    //peta to apo to table
    //prepei na mpei elegxos gia WildCards
    if (
      this.color === this.cardValue[this.selectedCard].color ||
      this.symbol === this.cardValue[this.selectedCard].number ||
      this.cardValue[this.selectedCard].number === '+4' ||
      this.cardValue[this.selectedCard].number === 'WildCard'
    ) {
      this.cardValue.splice(this.selectedCard, 1);
      this.cards.splice(this.selectedCard, 1);
      this.player.cards_hand = this.cards;
      this.playersService.update(this.player).subscribe((result: any) => {
        let tmp = {
          card: this.throwedCard,
          player: this.player,
          id: this.my_id
        };
        this.socketService.publish('card_played', tmp);
        //console.log('I throw a card');
      });
      this.selectedCard = null;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You cannot play this card!',
      });
    }

    if (this.cards.length == 1) {
      this.socketService.publish('one_card', this.my_id);
    }

    if (this.cards.length == 0) {
      clearInterval(this.theTimer);
      Swal.fire({
        title: 'Congratulations!',
        html: 'You won this round. <br>Next Round will start in a few seconds!',
        imageUrl: 'https://www.nicepng.com/png/full/6-69332_fireworks-png-images-free-download-clip-art-free.png',
        imageWidth: 200,
        imageHeight: 100,
        imageAlt: 'Custom image',
        timer: 30000,
        showConfirmButton: false,
      }).then(() => {
        this.unoClicked = false;
        this.socketService.publish('start_round', this.my_id);
      });
      this.socketService.publish('won_round', this.player);
    }
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
        //console.log('End of timer');
        clearInterval(this.theTimer);
        this.endOfTimer = true;
        if (this.drawed === false) {
          this.drawCard(1);
        } else {
          this.pass();
        }
      }
    }, 1000);
  }

  uno() {
    if (this.cards.length == 1) {
      console.log("I say uno")
      this.unoClicked = true
      this.player.unos++;
      this.playersService.update(this.player).subscribe((result: any) => {
        this.socketService.publish('uno_player', this.player);
        this.socketService.publish('wall_update', this.player);
      });
    }

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

  setCard(num: any, des: any, index: number, dyshr: boolean, clrblind: boolean, dys: boolean) {
    this.cardValue[index] = {
      color: des,
      number: num,
      dysrhythmia: dyshr,
      colorblindness: clrblind,
      dyslexia: dys
    };
    //console.log(this.cardValue[index])
  }

  WildCardGreen() {
    this.choose_color = false;
    //console.log(this.throwCard);
    if (this.throwedCard === '+4 All.png') {
      this.throwedCard = '+4 Green.png';
    } else if (this.throwedCard === 'WildCard All.png') {
      this.throwedCard = 'WildCard Green.png';
    }
    this.throw();
  }

  WildCardBlue() {
    this.choose_color = false;
    //console.log(this.throwCard);
    if (this.throwedCard === '+4 All.png') {
      this.throwedCard = '+4 Blue.png';
    } else if (this.throwedCard === 'WildCard All.png') {
      this.throwedCard = 'WildCard Blue.png';
    }
    this.throw();
  }
  WildCardRed() {
    this.choose_color = false;
    //console.log(this.throwCard);
    if (this.throwedCard === '+4 All.png') {
      this.throwedCard = '+4 Red.png';
    } else if (this.throwedCard === 'WildCard All.png') {
      this.throwedCard = 'WildCard Red.png';
    }
    this.throw();
  }
  WildCardYellow() {
    this.choose_color = false;
    //console.log(this.throwCard);
    if (this.throwedCard === '+4 All.png') {
      this.throwedCard = '+4 Yellow.png';
    } else if (this.throwedCard === 'WildCard All.png') {
      this.throwedCard = 'WildCard Yellow.png';
    }
    this.throw();
  }
}
