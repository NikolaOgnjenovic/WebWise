import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appBackgroundImageError]'
})
export class BackgroundImageErrorDirective {
  constructor(private el: ElementRef) {}

  @HostListener('error')
  onError() {
    this.el.nativeElement.style.backgroundImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF34KOokRt93iV8RG12wc_RY3LcH0CKJ41pwe7qJtnUg&s !important';
  }
}
