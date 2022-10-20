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
    this.SetUpData();
  }

  contests: Contest[] = [];
  problems: Problem[] = [];
  selecteIndex: number[] = [];

  handle: string = "";
  canFetch: boolean = false;
  category: string = Constants.ALL;

  page: number = 1;
  pageSize: number = 10;

  ngOnInit(): void {
  }

  SetUpData() {
    Promise.all([this.cfService.GetAllContests(), this.cfService.GetAllProblems()])
    .then((values) => {
      this.contests = values[0];
      this.problems = values[1];
      this.cfService.AddProblemsToContests(this.problems, this.contests);
      this.canFetch = true;
      console.log(this.canFetch);
    });
  }

  UpdateHandleData(): void {
    this.cfService.GetAllSubmissions(this.handle)
    .then((submissions: Submission[]) => {
      var groupedSubmission = groupBy(submissions, "contestId");
      this.contests.forEach(contest => {
        var id: number = contest.id;
        var constestSubmission : Submission[] = groupedSubmission[id];
        contest.problems.forEach(problem => {
          if (constestSubmission?.some((submission: Submission) => submission.verdict == Constants.OK && submission.problem.index == problem.index)) {
            problem.status = Constants.SOLVED;
          } else if (constestSubmission?.some((submission: Submission) => submission.problem.index == problem.index)) {
            problem.status = Constants.ATTEMPTED;
          }
        });
      });
      console.log("done");
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
      if (this.contests[i].problems.length > 0 && this.IsSelectedCategory(this.contests[i].category)) {
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

  OnTableDataChange(event: any) {
    this.page = event;
  }
}

var groupBy = function(xs: any, key: any) {
  return xs.reduce(function(rv: any, x: any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
