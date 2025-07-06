import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrls: ['./user.scss']
})
export class UserComponent implements OnInit {
  @Input() nameUser : any;
  ngOnInit() {
      
  }
}
