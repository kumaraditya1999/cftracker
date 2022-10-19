import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
  
  @Input() 
  @Output() handlePaginationEvent = new EventEmitter<any>();

  ngOnInit(): void {
  }

  OnTableDataChange(event: any) {
    this.handlePaginationEvent.emit(event);
  }
}
