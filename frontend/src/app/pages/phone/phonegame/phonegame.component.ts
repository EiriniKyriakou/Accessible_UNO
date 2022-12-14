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
  private my_id = myGlobals.id;
  public player = new PlayerModel();
  cards: string[] = [];
  public cardValue : CardModel[] = [];
  
  onMouseEnter(hoverCard: HTMLElement) {
    hoverCard.style.marginTop ="-12%";
  }

  onMouseOut(hoverCard: HTMLElement) {
    hoverCard.style.marginTop ="0%";
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
    },4000);
  }

  getClickAction(_event: any) {
    // console.log(_event);
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
