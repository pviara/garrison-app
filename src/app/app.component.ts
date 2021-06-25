import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { CharacterService } from './shared/services/character.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('appContainer')
  appContainer!: ElementRef;

  constructor(
    private _authService: AuthService,
    private _characterService: CharacterService,
    private _renderer: Renderer2,
  ) {}

  ngOnInit() {
    // localStorage.removeItem('user')
  }

  ngAfterViewInit() {
    this._initBackgroundImage();
  }

  private _initBackgroundImage() {
    const character = this._characterService.getCurrentCharacter();
    if (!character) return;
    
    let wallpaperType;
      
    if (character.side.faction === 'alliance') {
      wallpaperType = 'a2';
    } else if (character.side.faction === 'horde') {
      wallpaperType = 'h2';
    } else throw new Error("Character's faction is not valid.");
    
  this
    ._renderer
    .setStyle(
      this.appContainer.nativeElement,
      'background-image',
      `url('../assets/img/backgrounds/${wallpaperType}-wallpaper.jpg')`
    )
  }
}
