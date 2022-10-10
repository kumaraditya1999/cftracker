import { Component, OnInit } from '@angular/core';
import { CfResponse } from '../models/cfresponse';
import { Contest } from '../models/contest';
import { Problem } from '../models/problem';
import { ProblemSet } from '../models/problemset';
import { CfService } from '../services/cf.service';

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.css']
})
export class ContestsComponent implements OnInit {

  constructor(private cfService: CfService) {
    this.cfService.GetAllContests()
    .then((contests) => {
      this.contests = contests;
      console.log(this.contests);
    });

    this.cfService.GetAllProblems()
    .then((problems) => {
      this.problems = problems;
      console.log(this.problems);
    });

  }

  contests: Contest[] = [];
  problems: Problem[] = [];

  ngOnInit(): void {
  }
}
