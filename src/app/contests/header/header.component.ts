import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
