import {
  Component,
  OnInit
} from "@angular/core";
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'garrison-in',
  templateUrl: './in.component.html',
  styleUrls: ['./in.component.scss']
})
export class InComponent implements OnInit {
  isPlayScreen = false;
  
  constructor(
    private _router: Router
  ) {}

  ngOnInit() {
    if (this._router.url.includes('play')) {
      this.isPlayScreen = true;
    }
    
    this._router
      .events
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          if (event.url.includes('play')) {
            this.isPlayScreen = true;
          } else {
            this.isPlayScreen = false;
          }
        }
      });
  }
}
