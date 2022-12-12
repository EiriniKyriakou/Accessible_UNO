
import { CardModel } from 'src/app/global/models/cards/card.model';
import { Component, OnInit, Renderer2,Input} from '@angular/core';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: [ './card.component.css' ]
})

export class CardComponent  {
  // protected selectedCard: CardModel = new CardModel({
  //     name: "Red.png",
  //     number:"5"
  // });

  @Input() selectedCard:CardModel | undefined;
  test:any
  constructor(){
    setTimeout(()=>{ 
      
    if(this.selectedCard!=undefined){
      this.test=new CardModel({
            name: this.selectedCard?.name,
             number:this.selectedCard?.number
         });
    }
    },1000)
  }
  
}
