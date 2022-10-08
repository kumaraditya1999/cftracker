import { Component, OnInit } from '@angular/core';
import { Contest } from '../models/contest';

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.css']
})
export class ContestsComponent implements OnInit {

  constructor() { }

  contests: Contest[] = [
    {
      "id": 1728,
      "name": "Educational Codeforces Round 135 (Rated for Div. 2)",
      "type": "ICPC",
      "phase": "FINISHED"
    },
    {
      "id": 1726,
      "name": "Codeforces Round #819 (Div. 1 + Div. 2) and Grimoire of Code Annual Contest 2022",
      "type": "CF",
      "phase": "FINISHED",

    },
    {
      "id": 1729,
      "name": "Codeforces Round #820 (Div. 3)",
      "type": "ICPC",
      "phase": "FINISHED",
    }
  ];

  ngOnInit(): void {
  }

}
