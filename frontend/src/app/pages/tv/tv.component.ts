import { Component, OnInit, Renderer2 } from '@angular/core';
import { PlayerModel } from 'src/app/global/models/players/player.model';
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
  turnPlayer: PlayerModel | undefined;
  turn = false;
  meme = false;

  constructor(private renderer: Renderer2, private socketService: SocketsService,) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background-tv-wall.png)');
  }

  ngOnInit() {
    this.socketService.subscribe('new_game', (game: any) => {
      this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background-tv-wall.png)');
      this.game_time = false;
      this.waiting = false;
      this.turn = false;
      this.meme = false;
    });

    this.socketService.subscribe('card_played', (data: any) => {
      this.waiting = false;
      this.card = data.card;
      let splitted = this.card.split(' ', 2);
      this.number = splitted[0];
      if (this.number === '+2' || this.number === '+4') {
        this.meme = true;
        this.turn = false;
        this.game_time = false;
      } else {
        this.meme = false;
      }
      console.log(this.card)
    });

    this.socketService.subscribe("win", (id: any) => {
      this.turn = false;
      this.waiting = false;
      this.game_time = false;
      console.log('Player ' + id + ' won the round');
      this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/win.jpg)');
    });

    this.socketService.subscribe("turnPlayer", (pTurn: PlayerModel) => {
      if (this.meme) {
        this.turnPlayer = pTurn;
        this.turn = true;
        this.meme = false;
        this.game_time = false;

      } else {
        this.turn = true;
        this.game_time = false;
        this.turnPlayer = pTurn;
      }
    });

    this.socketService.subscribe('win_round', (plr: PlayerModel) => {
      this.turn = false;
      this.meme = false;
      this.waiting = false;
      this.game_time = false;
      console.log('Player ' + plr.username + ' won the round');
      this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background-tv-wall.png)');
      Swal.fire({
        title: 'Waiting for the new round!',
        html: plr.username + ' won the round',
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
      this.turn = false;
      this.meme = false;
      this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background-tv-wall.png)');
    });

    this.socketService.subscribe('game_start', (id: any) => {
      this.waiting = false;
      this.turn = false;
      this.meme = false;
      this.game_time = true;

    });

    this.socketService.subscribe('waiting', (id: any) => {
      this.turn = false;
      this.game_time = false;
      this.meme = false;
      this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background-tv-wall.png)');
      this.waiting = true;
    });

  }

}
