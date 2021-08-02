import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'convert_to_readable_duration'
})
export class ConvertToReadableDurationPipe implements PipeTransform {
  transform(seconds: number) {
    let duration = '';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds - (minutes * 60);

    duration += this._prefixWithZero(minutes);
    duration += ':';
    duration += this._prefixWithZero(remainingSeconds);
    
    return duration;
  }

  private _prefixWithZero(n: number) {
    return n * 10 < 100
      ? `0${n}`
      : n.toString();
  }
}
