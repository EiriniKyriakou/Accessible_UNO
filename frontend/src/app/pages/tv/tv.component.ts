import { Component, OnInit, Renderer2 } from '@angular/core';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TVComponent implements OnInit {
  card = "";
  number: any;
  game_time = false;
  waiting = false;
  constructor(private renderer: Renderer2, private socketService: SocketsService,) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background-tv-wall.png)');
  }

  ngOnInit() {
    this.socketService.subscribe('card_played', (data: any) => {
      this.waiting = false;
      this.game_time = false;
      this.card = data.card;
      let splitted = this.card.split(' ', 2);
      this.number = splitted[0];
      console.log(this.card)
    });
    this.socketService.subscribe("win", (id: any) => {
      this.waiting = false;
      this.game_time = false;
      console.log('Player ' + id + ' won the round');
      this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/win.jpg)');
    });

    this.socketService.subscribe('won_round', (id: any) => {
      this.waiting = false;
      this.game_time = false;
      console.log('Player ' + id + ' won the round');
      this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background-tv-wall.png)');
      Swal.fire({
        title: 'Waiting for the new round!',
        html: '',
        imageUrl: 'https://cdn.dribbble.com/users/100757/screenshots/1912706/media/db8f55111c06444b63f1e99746d11c4b.gif',
        imageWidth: 500,
        imageHeight: 300,
        imageAlt: 'Custom image',
        timer: 30000,
        showConfirmButton: false,
      }).then(() => {
        this.game_time = true;
      });
    });

    this.socketService.subscribe('start_round', (id: any) => {

      this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background-tv-wall.png)');
    });

    this.socketService.subscribe('game_start', (id: any) => {
      this.waiting = false;

      this.game_time = true;
    });

    this.socketService.subscribe('waiting', (id: any) => {
      this.game_time = false;
      this.waiting = true;
    });

  }

}
