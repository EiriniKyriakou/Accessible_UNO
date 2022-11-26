import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-tablegame',
  templateUrl: './tablegame.component.html',
  styleUrls: ['./tablegame.component.scss']
})
export class TableGameComponent implements OnInit {
  constructor(private renderer: Renderer2) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
  }

  ngOnInit() {
  }
}
