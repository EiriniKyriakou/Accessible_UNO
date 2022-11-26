import { Component, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  sign=false
  main=false
  hourglass=false
  hided=false
  signup=false
  constructor(private renderer: Renderer2) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
  }

  ngOnInit() { }
  
  signIn(){
    this.sign=true
  }

  signUp(){
    this.signup=true
    this.sign=true
  }

  signInB(){
    this.sign=false
    this.main=true
  }

  startGame(){
    this.main=false
    this.hourglass=true
  }

  getClickAction(_event: any) {
    // console.log(_event);
    this.hided = _event;
    if(_event) {
      this.renderer.setStyle(document.body, 'background', 'whitesmoke');

    }
    else {
      this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
    }
  }

  // hide(){
  //   console.log("out")
  //   this.hided=!this.hided;
  //   this.sign=!this.sign;
  //   if(this.hided){
  //     this.renderer.setStyle(document.body,'background','whitesmoke');
  //   }
  //   else {
  //     this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
  //   }
   
    
    
  // }
 

}
