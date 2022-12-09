
import { CardModel } from 'src/app/global/models/cards/card.model';
import { Component, OnInit, Renderer2} from '@angular/core';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: [ './card.component.css' ]
})

export class CardComponent  {
  protected selectedCard: CardModel = new CardModel({
    name: "Red.png",
    number:"5"
  });


  // constructor(
  //   private socketService: SocketsService,
  //   private renderer: Renderer2
  // ) {
  //   this.renderer.setStyle(document.div, 'background-image', 'url(../../../assets/backgrounds/background.png)');
  // }
  
}
