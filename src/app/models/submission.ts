import { Problem } from "./problem";

export interface Submission {
    contestId: string;
    problem: Problem;
    verdict: string;
}