import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contest } from '../models/contest';
import { Observable, throwError } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { CfResponse } from '../models/cfresponse';
import { Submission } from '../models/submission';
import { ProblemSet } from '../models/problemset';
import { Problem } from '../models/problem';
import { Constants, ContestCategory } from '../models/constants';

const allContestsUrl = "https://codeforces.com/api/contest.list";
const allSubmissionsUrl = "https://codeforces.com/api/contest.status";
const allProblemsUrl = "https://codeforces.com/api/problemset.problems";
const contestBaseUrl = "https://codeforces.com/contest"

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

  async GetAllSubmissions(contestId: string, handle: string) : Promise<Submission[]> {
    var url: string = `${allSubmissionsUrl}?contestId=${contestId}&handle=${handle}`;
    var submissions = await firstValueFrom(this.http.get<CfResponse<Submission[]>>(url));
    return submissions.result;
  }

  async GetAllProblems(): Promise<Problem[]> {
    var problemset = await firstValueFrom(this.http.get<CfResponse<ProblemSet>>(allProblemsUrl));
    return problemset.result.problems;
  }

  GetCategory(contestName: string) : string {
    for (var category in ContestCategory) {
      if (contestName.indexOf(category) != -1) {
        return category;
      }
    }
    return Constants.OTHERS; 
  }
}
