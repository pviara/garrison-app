import {
  AfterViewChecked,
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2
} from "@angular/core";
import { LocalStorageService } from "src/app/shared/services/local-storage.service";
import { Subscription } from "rxjs";

@Directive({
  selector: '[faction-hover-background]'
})
export class FactionHoverBackgroundDirective implements AfterViewChecked, OnInit {
  private _characterSubscription!: Subscription;

  private _color!: string;
  
  @HostListener('mouseover')
  onMouseOver() {
    this._renderer
      .setStyle(
        this._element.nativeElement,
        'background-color',
        this._color
      );
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this._renderer
      .setStyle(
        this._element.nativeElement,
        'background-color',
        '#000'
      );
  }

  constructor(
    private _element: ElementRef,
    private _localStorageService: LocalStorageService,
    private _renderer: Renderer2
  ) {}

  ngAfterViewChecked() {
    this._characterSubscription.unsubscribe();
  }
  
  ngOnInit() {
    this._initButtonColor();
  }

  private _initButtonColor() {
    this._characterSubscription = this
      ._localStorageService
      .characterSubject
      .subscribe(character => {
        if (!character) return;

        console.log(character);

        if (character.side.faction === 'alliance') {
          this._color = '#0340a3';
        } else if (character.side.faction === 'horde') {
          this._color = '#a30303';
        } else throw new Error("Character's faction is not valid.");
      });
  }
}