import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants, ContestCategory } from 'src/app/models/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { 
    this.allCategories = [Constants.ALL];
    ContestCategory.forEach(category => {
      this.allCategories.push(category);
    });
  }

  @Input() handle: string = "";
  selectedCategory: string = Constants.ALL;

  @Output() handleEvent = new EventEmitter<string>();
  @Output() categoryEvent = new EventEmitter<string>();

  allCategories: string[] = []

  ngOnInit(): void {
  }

  UpdateHandle() {
    this.handleEvent.emit(this.handle);
  }

  UpdateCategory(category: string) {
    this.selectedCategory = category;
    this.categoryEvent.emit(this.selectedCategory);
  }

}
