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
    Promise.all([this.cfService.GetAllContests(), this.cfService.GetAllProblems()])
    .then((values) => {
      this.contests = values[0];
      this.problems = values[1];
      cfService.AddProblemsToContests(this.problems, this.contests);
    });
  }

  contests: Contest[] = [];
  problems: Problem[] = [];

  ngOnInit(): void {
  }
}
