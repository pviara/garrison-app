import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from "@angular/core";
import { Subscription } from "rxjs";
import { LocalStorageService } from "src/app/shared/services/local-storage.service";

@Component({
  selector: 'garrison-in-play-global-resource-displayer',
  templateUrl: './global-resource-displayer.component.html',
  styleUrls: ['./global-resource-displayer.component.scss']
})
export class GlobalResourceDisplayerComponent implements AfterViewChecked, AfterViewInit, OnInit {
  characterSubscription!: Subscription;

  @ViewChild('factionColoredText')
  factionColoredText!: ElementRef;

  timer: any;
  
  value = 0;

  constructor(
    private _localStorageService: LocalStorageService,
    private _renderer: Renderer2
  ) {}

  ngAfterViewChecked() {
    this.characterSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this._initTextColor();
  }

  ngOnInit() {
    this.timer = setInterval((_: any) => {
      this.value++;
    }, 1000);
  }

  private _initTextColor() {
    this.characterSubscription = this
      ._localStorageService
      .characterSubject
      .subscribe(character => {
        if (!character) return;

        let color;

        if (character.side.faction === 'alliance') {
          color = '#8da3af';
        } else if (character.side.faction === 'horde') {
          color = '#af8d8d';
        } else throw new Error("Character's faction is not valid.");

        this._renderer
          .setStyle(
            this.factionColoredText.nativeElement,
            'color',
            color
          );
      });
  }
}
