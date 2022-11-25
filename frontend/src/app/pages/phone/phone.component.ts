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
  constructor(private renderer: Renderer2) {
    this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
  }

  ngOnInit() { }

  signIn(){
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
  hide(){
    //how do i undo this tho?!
    // let f=0;
    if(!this.hided){
      this.renderer.setStyle(document.body, 'background', 'whitesmoke');
      this.hided=true
      this.sign=true
      console.log("mpike stin 2")
      //f=1;
    }

    // if (f==0){
    //   this.renderer.setStyle(document.body, 'background-image', 'url(../../../assets/backgrounds/background.png)');
    //   this.hided=false
    //   this.sign=false
    //   console.log("mpike stin 1 ")

    // }
   
    
    
  }
 

}
