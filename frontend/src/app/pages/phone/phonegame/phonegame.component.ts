import { Component, OnInit, Renderer2} from '@angular/core';
import { PlayerModel } from 'src/app/global/models/players/player.model';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { PlayersService } from 'src/app/global/services/players/players.service';
import { CardModel } from 'src/app/global/models/cards/card.model';
import * as myGlobals from 'src/app/pages/phone/phone.component'; 

@Component({
  selector: 'app-home',
  templateUrl: './phonegame.component.html',
  styleUrls: ['./phonegame.component.scss']
})
export class PhoneGameComponent implements OnInit {
  my_id = myGlobals.id;
  //private my_id = "63932a05a130d8411cd3f399"
  public player = new PlayerModel();
  cards: string[] = [];
  public cardValue : CardModel[] = [];
  cardsReady=false;
  selectedCard:any;
  //throwedCard: CardModel | undefined;
  throwedCard: string =""
  public my_turn = false;

  onMouseEnter(hoverCard: HTMLElement,index:any) {
    hoverCard.style.marginTop ="-12%";
    this.selectedCard=index;
  }

  onMouseOut(hoverCard: HTMLElement) {
    hoverCard.style.marginTop ="0%";
  }
  
  throwCard(){
    this.throwedCard=this.cards[this.selectedCard];
    //peta to apo to front
    this.cardValue.splice(this.selectedCard, 1);
    console.log(this.cardValue)
    // this.player.cards_hand=this.cardValue;
    this.cards.splice(this.selectedCard,1);
    this.player.cards_hand=this.cards;
    this.playersService.update(this.player).subscribe((result: any) => {});
    this.socketService.publish("card_played", this.throwedCard);
    this.selectedCard=null;
    console.log(this.selectedCard)
  }

  
  changeText: boolean;
  hided = false;
  constructor(
    private socketService: SocketsService,
    private renderer: Renderer2,
    private playersService: PlayersService) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
    this.changeText = false;
    //console.log(this.router.getCurrentNavigation().extras.state.example);
  }

  ngOnInit() { 
    console.log("My id " + this.my_id);
    this.socketService.subscribe("turn", (data: any) => {
      if (data != this.my_id){
        this.my_turn = false;
      }else{
        this.my_turn = true;
      }
    });
    setTimeout(() => {
      this.playersService.getById(this.my_id).subscribe((result:any) => {
        console.log("I'm the player:")
        console.log(result)
        if(JSON.stringify(result) === undefined ){
          console.log("error")
        }else{
          this.player = result;
          this.cards = result.cards_hand;
          //console.log(this.cards)
          var i = 0;
          for (var card of this.cards){
            var splitted = card.split(" ", 2); 
            this.setCard(splitted[0],splitted[1],i);
            i++;
          }        
        }
      });
      this.cardsReady=true;
    },6000);
  }

  getClickAction(_event: any) {
    this.hided = _event;
    if(_event) {
      this.renderer.setStyle(document.body, 'background', 'whitesmoke');

    }
    else {
      this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
    }
  }

  setCard(num: any,des: any,index:number){
    this.cardValue[index]={
      name:des,
      number:num
    }
    //console.log(this.cardValue[index])
  }
  
}
