import { Component } from '@angular/core';
import { CardModel } from 'src/app/global/models/cards/card.model';

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
  
}
