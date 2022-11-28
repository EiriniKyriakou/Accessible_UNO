import { Component, OnInit ,Renderer2} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TVComponent implements OnInit {
  four=false;
  two=false;

  ngOnInit() {
    this.four=true;
    setTimeout(() => this.change(), 3000);  //3s
   }

  constructor( private renderer: Renderer2 ) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background-tv-wall.png)');
  }

  change(){
    this.four = false;
    this.two = true;
    setTimeout(() => this.change2(), 3000);  //3s
  }

  change2(){
    this.four = false;
    this.two = false;
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/win.png)');
  }
}
