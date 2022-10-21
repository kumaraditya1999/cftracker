import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contest } from '../models/contest';
import { firstValueFrom } from 'rxjs';
import { CfResponse } from '../models/cfresponse';
import { Submission } from '../models/submission';
import { ProblemSet } from '../models/problemset';
import { Problem } from '../models/problem';
import { Constants, ContestCategory } from '../models/constants';

const baseUrl = "https://codeforces.com";
const allContestsUrl = `${baseUrl}/api/contest.list`;
const allSubmissionsUrlWithContest = `${baseUrl}/api/contest.status`;
const allProblemsUrl = `${baseUrl}/api/problemset.problems`;
const contestBaseUrl = `${baseUrl}/contest`;
const allSubmissionsUrl = `${baseUrl}/api/user.status`

@Injectable({
  providedIn: 'root'
})
export class CfService {

  constructor(private http: HttpClient) { }
  
  async GetAllContests() : Promise<Contest[]> {    
    var contestResult = await firstValueFrom(this.http.get<CfResponse<Contest[]>>(allContestsUrl));
    var contests = contestResult.result
    .filter((contest) => contest.phase == Constants.FINISHED)
    .map((contest) => {
      contest.url = `${contestBaseUrl}/${contest.id}`;
      contest.category = this.GetCategory(contest.name);
      return contest;
    });

    return contests;
  }

  async GetAllSubmissionsInAContest(contestId: string, handle: string) : Promise<Submission[]> {
    var url: string = `${allSubmissionsUrlWithContest}?contestId=${contestId}&handle=${handle}`;
    var submissionsResult = await firstValueFrom(this.http.get<CfResponse<Submission[]>>(url));
    var submissions = submissionsResult.result;
    return submissions;
  }

  async GetAllSubmissions(handle: string) : Promise<Submission[]> {
    var url: string = `${allSubmissionsUrl}?handle=${handle}`;
    var submissionsResult = await firstValueFrom(this.http.get<CfResponse<Submission[]>>(url));
    var submissions = submissionsResult.result;
    return submissions;
  }

  async GetAllProblems(): Promise<Problem[]> {
    var problemsetResult = await firstValueFrom(this.http.get<CfResponse<ProblemSet>>(allProblemsUrl));
    var problems = problemsetResult.result.problems
    return problems;
  }

  GetCategory(contestName: string) : string {
    for (var category of ContestCategory) {
      if (contestName.indexOf(category) != -1) {
        return category;
      }
    }
    return Constants.OTHERS; 
  }

  AddProblemsToContests(problems: Problem[], contests: Contest[]) {
    contests.forEach(contest => contest.problems = problems
      .filter(problem => problem.contestId == contest.id)
      .sort((a, b) => (a.index < b.index) ? -1: 1)
      .map((problem) => { 
        problem.url = `${contest.url}/problem/${problem.index}`;
        problem.status = '';
        return problem;
      }));
  }

  SyncMissingProblemsFromDiv1(contests: Contest[]) {
    contests.forEach(contest => {
      if (contest.category == Constants.DIV_1) {
        var div2Contest = contests.find(x => x.id == contest.id + 1) || {} as Contest;
        div2Contest = div2Contest == undefined ? {} as Contest : div2Contest;
        if (div2Contest.category == Constants.DIV_2) {
          contest.problems.forEach(problem => {
            div2Contest?.problems.push(problem);
          });
        }
      }
    });
  }
}
