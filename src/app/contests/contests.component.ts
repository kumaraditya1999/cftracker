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
    this.PopulateProblems();
    this.PopulateContests();
  }

  contests: Contest[] = [];
  problems: Problem[] = [];

  ngOnInit(): void {
  }

  private PopulateProblems() {
    this.cfService.GetAllProblems()
    .subscribe((data: CfResponse<ProblemSet>) => {
      this.problems = data.result.problems;
    });
  }

  private PopulateContests() {
    this.cfService.GetAllContests()
    .subscribe((data: CfResponse<Contest[]>) =>
      {
        this.contests = data.result.filter((contest: Contest) => contest.phase == "FINISHED");
      });
  }

}
