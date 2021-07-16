import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'garrison-in-play-building-instance',
  templateUrl: './building-instance.component.html',
  styleUrls: ['./building-instance.component.scss']
})
export class BuildingInstanceComponent implements OnInit {
  private _code!: string;
  
  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    this._route
      .paramMap
      .subscribe(params => this._code = params.get('code') as string);
  }
}