import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[disable-control]'
})
export class DisableControlDirective {
  @Input() disableControl(condition: Boolean) {
    console.log('wesh');
    const action = condition ? 'disable' : 'enable';
    if (!this._ngControl.control) return;

    this._ngControl.control[action]();
  }

  constructor(private _ngControl: NgControl) {}
}