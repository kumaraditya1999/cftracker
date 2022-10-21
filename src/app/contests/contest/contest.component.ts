import { Component, Input, OnInit } from '@angular/core';
import { Contest } from '../../models/contest';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css']
})
export class ContestComponent implements OnInit {

  @Input() contest: Contest = {} as Contest;
  @Input() index: number = -1;
  @Input() showProblemRatings: boolean = false;

  math: any = Math;
  maxNameLength: number = 75;
  maxColumns: number = 10;

  constructor() { }

  ngOnInit(): void {
  }

}
