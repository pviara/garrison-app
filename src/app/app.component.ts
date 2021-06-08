import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild
} from '@angular/core';
import { CharacterService } from './services/character.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appContainer')
  appContainer!: ElementRef;

  constructor(
    private characterService: CharacterService,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this._initBackgroundImage();
  }

  private _initBackgroundImage() {
    const character = this.characterService.getCurrentCharacter();
    if (!character) return;
    
    let wallpaperType;
      
    if (character.side.faction === 'alliance') {
      wallpaperType = 'a2';
    } else if (character.side.faction === 'horde') {
      wallpaperType = 'h2';
    } else throw new Error("Character's faction is not valid.");
    
  this
    .renderer
    .setStyle(
      this.appContainer.nativeElement,
      'background-image',
      `url('../assets/img/backgrounds/${wallpaperType}-wallpaper.jpg')`
    )
  }
}
