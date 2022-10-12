import { Component, OnInit } from '@angular/core';
import { CfResponse } from '../models/cfresponse';
import { Constants } from '../models/constants';
import { Contest } from '../models/contest';
import { Problem } from '../models/problem';
import { ProblemSet } from '../models/problemset';
import { Submission } from '../models/submission';
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
      this.canFetch = true;
      console.log(this.canFetch);
    });
  }

  contests: Contest[] = [];
  problems: Problem[] = [];

  handle: string = "";
  canFetch: boolean = false;
  category: string = Constants.ALL;

  ngOnInit(): void {
  }

  UpdateHandleData(): void {
    this.cfService.GetAllSubmissions(this.handle)
    .then((submissions: Submission[]) => {
      var groupedSubmission = groupBy(submissions, "contestId");
      this.problems.forEach(problem => {
        var id: number = problem.contestId;
        problem.solved = groupedSubmission[id.toString()]?.some((submission: Submission) => submission.verdict == Constants.OK) ?? false;
      });
    });
  }

  IsSelectedCategory(category: string) {
    if (this.category == Constants.ALL) {
      return true;
    }
    return this.category == category;
  }
}

var groupBy = function(xs: any, key: any) {
  return xs.reduce(function(rv: any, x: any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
