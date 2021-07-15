import { ActivatedRoute } from '@angular/router';
import {
  Component,
  Input,
  OnInit
} from "@angular/core";
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { IGarrison } from "src/models/dynamic/IGarrison";
import { IResearch } from 'src/models/static/IResearch';

@Component({
  selector: 'garrison-in-play-research-instance',
  templateUrl: './research-instance.component.html',
  styleUrls: ['./research-instance.component.scss']
})
export class ResearchInstanceComponent implements OnInit {
  researches!: IResearch[];
  
  character!: ICharacter;
  
  @Input()
  garrison!: IGarrison;

  constructor(private _route: ActivatedRoute) {}
  
  ngOnInit() {
    this.researches = this._route.snapshot.data.researches;
    this.character = this._route.snapshot.data.character;
  }
}