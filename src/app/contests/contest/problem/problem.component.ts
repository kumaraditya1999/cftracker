import { Component, Input, OnInit } from '@angular/core';
import { Problem } from 'src/app/models/problem';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {
  @Input() problem: Problem = {} as Problem;

  constructor() { }

  ngOnInit(): void {
  }

  GetRatingClass(rating: number): string {
    if (rating < 1200) {
      return "newbie";
    } else if (rating < 1400) {
      return "pupil";
    } else if (rating < 1600) {
      return "specialist"
    } else if (rating < 1900) {
      return "expert";
    } else if (rating < 2100) {
      return "cm";
    } else if (rating < 2300) {
      return "master";
    } else if (rating < 2400) {
      return "im";
    } else if (rating < 2600) {
      return "gm";
    } else if (rating < 3000) {
      return "igm";
    } else if (rating >= 3000) {
      return "lgm";
    }
    else return "default";
  }

}
