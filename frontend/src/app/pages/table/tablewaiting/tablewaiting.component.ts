import { Component, OnInit, Renderer2, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-tablewaiting',
  templateUrl: './tablewaiting.component.html',
  styleUrls: ['./tablewaiting.component.scss']
})
export class TableWaitingComponent implements OnInit {
  constructor(private router: Router, private renderer: Renderer2) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
  }

  ngOnInit() {
    this.timer();
  }
  
  timer(){
    setTimeout(() => this.changePage(), 10000);  //60s
  }

  changePage(){
    this.router.navigate(['/tablegame']);
  }
}
