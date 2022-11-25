import { Component, OnInit, Renderer2, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-tablewaiting',
  templateUrl: './tablewaiting.component.html',
  styleUrls: ['./tablewaiting.component.scss']
})
export class TableWaitingComponent implements OnInit {

  constructor(private renderer: Renderer2) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
  }

  ngOnInit() { }

}
