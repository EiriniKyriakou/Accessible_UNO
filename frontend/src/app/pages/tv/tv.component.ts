import { Component, OnInit, Renderer2 } from '@angular/core';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-home',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TVComponent implements OnInit {
  card = "";
  number: any;

  constructor(private renderer: Renderer2, private socketService: SocketsService,) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background-tv-wall.png)');
  }

  ngOnInit() {
    this.socketService.subscribe('card_played', (data: any) => {
      this.card = data.card;
      let splitted = this.card.split(' ', 2);
      this.number = splitted[0];
      console.log(this.card)
    });

    this.socketService.subscribe('won_round', (id: any) => {
      console.log('Player ' + id + ' won the round');
      this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/win.png)');
    });

    this.socketService.subscribe('start_round', (id: any) => {
      this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background-tv-wall.png)');
    });
  }

}
