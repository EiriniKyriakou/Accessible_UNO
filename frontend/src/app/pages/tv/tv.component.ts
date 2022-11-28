import { Component, OnInit ,Renderer2} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TVComponent implements OnInit {


  ngOnInit() { }

  constructor( private renderer: Renderer2 ) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background-tv-wall.png)');
  }
}
