import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  @Input() canFetch: boolean = false;
  handle: string = "";

  @Output() handleEvent = new EventEmitter<string>();
  @Output() categoryEvent = new EventEmitter<string>(); 

  ngOnInit(): void {
  }

  UpdateHandle() {
    console.log(this.handle);
    this.handleEvent.emit(this.handle);
  }

  UpdateCategory(category: string) {
    this.categoryEvent.emit(category);
  }
}
