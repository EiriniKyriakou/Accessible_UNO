import { Component, OnInit, Renderer2} from '@angular/core';
import { PlayerModel } from 'src/app/global/models/players/player.model';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { PlayersService } from 'src/app/global/services/players/players.service';

@Component({
  selector: 'app-home',
  templateUrl: './phonegame.component.html',
  styleUrls: ['./phonegame.component.scss']
})
export class PhoneGameComponent implements OnInit {

  cards: string[] = ["jane", "mary", "bob", "john", "alex"];
  onMouseEnter(hoverCard: HTMLElement) {
    hoverCard.style.marginTop ="-20%";
  }

  onMouseOut(hoverCard: HTMLElement) {
    hoverCard.style.marginTop ="0%";
  }
  
  
  changeText: boolean;
  hided = false;
  constructor(
    private socketService: SocketsService,
    private renderer: Renderer2
  ) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
    this.changeText = false;
  }

  ngOnInit() { }

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


  
}
