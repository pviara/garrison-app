import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'garrison-in-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(this._route.snapshot.data.garrison);
  }
}