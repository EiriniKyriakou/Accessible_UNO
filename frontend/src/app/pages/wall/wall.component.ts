import { Component, OnInit ,Renderer2} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  constructor( private renderer: Renderer2 ) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background-tv-wall.png)');
  }
  ngOnInit() { }

}
