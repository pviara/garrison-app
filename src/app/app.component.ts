import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { LocalStorageService } from './shared/services/local-storage.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('appContainer')
  appContainer!: ElementRef;

  isStorageFilled: boolean = true;
  
  constructor(
    private _authService: AuthService,
    private _localStorageService: LocalStorageService,
    private _renderer: Renderer2,
    private _router: Router
  ) {}

  ngAfterViewInit() {
    this._initBackgroundImage();
  }

  ngOnInit() {
    this.isStorageFilled = this._checkLocalStorageItemsExistence();
  }

  onDisconnect() {
    this.isStorageFilled = false;
    this
      ._authService
      .disconnect()
      .subscribe(_ => {
        this._renderer
          .setStyle(
            this.appContainer.nativeElement,
            'background-image',
            "url('../assets/img/backgrounds/global-wallpaper.jpg')"
          );
        window.location.reload();
      });
  }

  private _checkLocalStorageItemsExistence() {
    return !!localStorage.getItem('character')
      && !!localStorage.getItem('garrisonId')
      && !!localStorage.getItem('user');
  }
  
  private _initBackgroundImage() {
    this
      ._localStorageService
      .characterSubject
      .subscribe(character => {
        if (!character) return;
        this.isStorageFilled = true;
      
        let wallpaperType;
        
        if (character.side.faction === 'alliance') {
          wallpaperType = 'a2';
        } else if (character.side.faction === 'horde') {
          wallpaperType = 'h2';
        } else throw new Error("Character's faction is not valid.");
    
        this._renderer
          .setStyle(
            this.appContainer.nativeElement,
            'background-image',
            `url('../assets/img/backgrounds/${wallpaperType}-wallpaper.jpg')`
          );
      });
  }
}
