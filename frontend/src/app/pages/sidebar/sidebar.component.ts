import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [ './sidebar.component.css' ]
})
export class SidebarComponent  implements OnInit {
  name = 'Angular';
  ngOnInit() { }
}
