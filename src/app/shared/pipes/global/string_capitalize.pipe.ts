import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'string_capitalize'
})
export class StringCapitalizePipe implements PipeTransform {
  transform(str: string) {
    const words = str.split(' ');
    let finalStr = '';

    words.forEach(word => {
      finalStr += `${word.charAt(0).toUpperCase()}${word.slice(1)} `
    });

    return finalStr.slice(0, -1);
  }
}