import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
  
  @Output() handlePaginationEvent = new EventEmitter<any>();

  @Input() showProblemRatings: boolean = false;
  @Input() hideCompletedContests: boolean = false;

  @Output() toggleHideCompletedContestsEvent = new EventEmitter<any>();
  @Output() toggleShowProblemRatingsEvent = new EventEmitter<any>();

  ngOnInit(): void {
  }

  OnTableDataChange(event: any) {
    this.handlePaginationEvent.emit(event);
  }

  ToggleShowProblemRatings() {
    this.showProblemRatings = !this.showProblemRatings;
    this.toggleShowProblemRatingsEvent.emit();
  }

  ToggleHideCompletedContests() {
    this.hideCompletedContests = !this.hideCompletedContests;
    this.toggleHideCompletedContestsEvent.emit();
  }
}
