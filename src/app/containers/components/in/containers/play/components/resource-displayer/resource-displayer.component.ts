import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'garrison-in-play-resource-displayer',
  templateUrl: './resource-displayer.component.html',
  styleUrls: ['./resource-displayer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResourceDisplayerComponent implements AfterContentInit {
  @Input()
  color!: string;
  
  @ContentChild('factionColoredText')
  factionColoredText!: ElementRef;

  constructor(private _renderer: Renderer2) {}

  ngAfterContentInit() {
    this._renderer
      .setStyle(
        this.factionColoredText.nativeElement,
        'color',
        this.color
      );
  }
}