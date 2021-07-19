import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit
} from '@angular/core';
import { FetchByCodePipe } from '../../../../pipes/static/fetch-by-code.pipe';
import { GarrisonService } from 'src/app/containers/components/in/services/dynamic/garrison.service';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { IGarrison } from 'src/models/dynamic/IGarrison';
import { IResearch } from 'src/models/static/IResearch';
import { IStaticEntity } from 'src/models/static/IStaticEntity';
import { ResearchService } from 'src/app/containers/components/in/services/static/research.service';

@Component({
  selector: 'garrison-in-play-research-instance',
  templateUrl: './research-instance.component.html',
  styleUrls: ['./research-instance.component.scss'],
  providers: [
    FetchByCodePipe
  ]
})
export class ResearchInstanceComponent implements OnInit {
  researches!: IResearch[];

  character!: ICharacter;

  garrison!: IGarrison;
  
  staticEntity!: IStaticEntity;
  
  constructor(
    private _researchService: ResearchService,
    private _fetchByCodePipe: FetchByCodePipe,
    private _garrisonService: GarrisonService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.researches = this
      ._researchService
      .getResearchesFromStorage() as IResearch[];

    this.character = this._route.snapshot.data.character;

    this._garrisonService
      .garrisonSubject
      .subscribe(garrison => {
        if (!garrison) {
          throw new Error(`A valid garrison must be given to ${this.constructor.name}.`);
        }

        this.garrison = garrison;
      });
    
    this._route
      .paramMap
      .subscribe(params => {
        const code = params.get('code');
        if (!code) return;
        
        const research = this
          ._fetchByCodePipe
          .transform(this.researches, code);
        if (!research) {
          throw new Error(`A valid research code must be given to ${this.constructor.name}.`);
        }

        this.staticEntity = research;
      });
  }
}