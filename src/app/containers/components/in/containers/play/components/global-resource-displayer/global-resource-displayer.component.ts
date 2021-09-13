import {
  AfterViewChecked,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Subscription } from "rxjs";
import { LocalStorageService } from "src/app/shared/services/local-storage.service";
import {
  GarrisonBuilding,
  GarrisonResearch,
  GarrisonResources,
  GarrisonUnit
} from 'src/models/dynamic/IGarrison';
import { IBuilding } from 'src/models/static/IBuilding';
import { IUnit } from 'src/models/static/IUnit';

@Component({
  selector: 'garrison-in-play-global-resource-displayer',
  templateUrl: './global-resource-displayer.component.html',
  styleUrls: ['./global-resource-displayer.component.scss']
})
export class GlobalResourceDisplayerComponent implements AfterViewChecked, OnDestroy, OnInit {
  private _characterSubscription!: Subscription;

  color!: string;

  @Input()
  dynamicBuildings!: GarrisonBuilding[];

  @Input()
  dynamicResearches!: GarrisonResearch[];

  @Input()
  dynamicUnits!: GarrisonUnit[];
  
  now = new Date();
  
  @Input()
  resources!: GarrisonResources;

  @Input()
  staticBuildings!: IBuilding[];

  @Input()
  staticUnits!: IUnit[];
  
  private _timer: any;
  
  value = 0;

  constructor(private _localStorageService: LocalStorageService) {}

  ngAfterViewChecked() {
    this._characterSubscription.unsubscribe();
  }

  ngOnDestroy() {
    clearInterval(this._timer);
  }

  ngOnInit() {
    this._initTextColor();
    this._timer = setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  private _initTextColor() {
    this._characterSubscription = this
      ._localStorageService
      .characterSubject
      .subscribe(character => {
        if (!character) return;

        if (character.side.faction === 'alliance') {
          this.color = '#8da3af';
        } else if (character.side.faction === 'horde') {
          this.color = '#af8d8d';
        } else throw new Error("Character's faction is not valid.");
      });
  }
}
