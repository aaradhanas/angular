import { Input, Directive, ElementRef } from '@angular/core';

import 'showdown';

const showdownJs = require('showdown');
const converter = new showdownJs.Converter();

@Directive({
  selector: '[appTextToShowdown]'
})
export class TextToShowdownDirective {

  @Input('appTextToShowdown') inputText: string;

  constructor(private el: ElementRef) {
    console.log('text = '+this.inputText);
    var sdText = converter.makeHtml(this.inputText);
    this.el.nativeElement.innerHTML =  sdText;
  }

}
