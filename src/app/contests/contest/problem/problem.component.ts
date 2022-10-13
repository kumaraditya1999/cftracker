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

}
