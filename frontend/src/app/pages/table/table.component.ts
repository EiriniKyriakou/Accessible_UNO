import { Component, OnInit,Renderer2, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  //wait=false;

  constructor(private renderer: Renderer2, private router: Router) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
  }

  ngOnInit() { }
  startGame($myParam: string = ''): void {
    const navigationDetails: string[] = ['/tablewaiting'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

  // startGame(){
  //   this.wait=true
  // }

}
