import { Problem } from "./problem";

export interface Contest {
    id: number;
    name: string;
    phase: string;
    type: string;
    url: string;
    problems: Problem[];
    category: string;
}