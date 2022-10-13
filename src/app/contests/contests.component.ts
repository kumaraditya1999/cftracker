import { Component, OnInit } from '@angular/core';
import { Constants } from '../models/constants';
import { Contest } from '../models/contest';
import { Problem } from '../models/problem';
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
  selecteIndex: number[] = [];

  handle: string = "";
  canFetch: boolean = false;
  category: string = Constants.ALL;

  ngOnInit(): void {
  }

  UpdateHandleData(): void {
    this.cfService.GetAllSubmissions(this.handle)
    .then((submissions: Submission[]) => {
      var groupedSubmission = groupBy(submissions, "contestId");
      this.contests.forEach(contest => {
        var id: number = contest.id;
        var constestSubmission : Submission[] = groupedSubmission[id];
        contest.problems.forEach(problem => {
          problem.solved = constestSubmission?.some((submission: Submission) => submission.verdict == Constants.OK && submission.problem.index == problem.index) ?? false;
        });
      });
    });
  }

  IsSelectedCategory(category: string) : boolean {
    if (this.category == Constants.ALL) {
      return true;
    }
    return this.category == category;
  }

  GetSelectedIndexes() : string[] {
    var indexes : string[] = [];
    for (var i in this.contests) {
      if (this.IsSelectedCategory(this.contests[i].category)) {
        indexes.push(i);
      }
    }
    return indexes;
  }

  GetSelectedContest(): Contest[] {
    var indexes = this.GetSelectedIndexes();
    var contests: Contest[] = [];
    indexes.forEach(index => contests.push(this.contests[<any>index]));
    return contests;
  }
}

var groupBy = function(xs: any, key: any) {
  return xs.reduce(function(rv: any, x: any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
