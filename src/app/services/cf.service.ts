import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contest } from '../models/contest';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CfResponse } from '../models/cfresponse';
import { Submission } from '../models/submission';
import { ProblemSet } from '../models/problemset';

const allContestsUrl = "https://codeforces.com/api/contest.list";
const allSubmissionsUrl = "https://codeforces.com/api/contest.status";
const allProblemsUrl = "https://codeforces.com/api/problemset.problems";

@Injectable({
  providedIn: 'root'
})
export class CfService {

  constructor(private http: HttpClient) { }
  
  GetAllContests() : Observable<CfResponse<Contest[]>> {    
    return this.http.get<CfResponse<Contest[]>>(allContestsUrl);
  }

  GetAllSubmissions(contestId: string, handle: string): Observable<CfResponse<Submission[]>> {
    var url: string = `${allSubmissionsUrl}?contestId=${contestId}&handle=${handle}`;
    return this.http.get<CfResponse<Submission[]>>(url)
  }

  GetAllProblems(): Observable<CfResponse<ProblemSet>> {
    return this.http.get<CfResponse<ProblemSet>>(allProblemsUrl);
  }
}
