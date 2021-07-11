import { Directive, ElementRef, OnDestroy, Renderer2 } from "@angular/core";

@Directive({
  selector: '[smooth-text-changer]'
})
export class SmoothTextChangerDirective implements OnDestroy {
  private _changes!: MutationObserver;

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2
  ) {
    this._changes = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach(mutation => {
        console.log(mutation);
        this._renderer
          .addClass(
            this._element.nativeElement,
            'animated-changable-text'
          );
        
        setTimeout(() => {
          this._renderer
            .removeClass(
              this._element.nativeElement,
              'animated-changable-text'
            );
        }, 300);
      });
    });

    this._changes
      .observe(
        this._element.nativeElement,
        {
          attributes: false,
          childList: false,
          subtree: true,
          characterData: true
        }
      );
  }

  ngOnDestroy() {
    this._changes.disconnect();
  }
}