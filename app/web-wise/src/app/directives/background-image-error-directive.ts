import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appBackgroundImageError]'
})
export class BackgroundImageErrorDirective {
  constructor(private el: ElementRef) {}

  @HostListener('error')
  onError() {
    this.el.nativeElement.style.backgroundImage = 'url(https://images.freeimages.com/images/large-previews/355/poppies-2-1334190.jpg?fmt=webp&w=500)';
  }
}
