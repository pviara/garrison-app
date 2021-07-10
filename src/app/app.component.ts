import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { LocalStorageService } from './shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked, AfterViewInit, OnInit {
  @ViewChild('appContainer')
  appContainer!: ElementRef;

  constructor(
    private _localStorageService: LocalStorageService,
    private _renderer: Renderer2,
  ) {}

  ngOnInit() {
    // localStorage.clear();
  }

  ngAfterViewInit() {
    this._initBackgroundImage();
  }

  ngAfterViewChecked() {
    this._localStorageService
      .characterSubject
      .unsubscribe();
  }

  private _initBackgroundImage() {
    this._localStorageService
      .characterSubject
      .subscribe(character => {
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
          );
      });
  }
}
