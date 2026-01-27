import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fraction',
})
export class FractionPipe implements PipeTransform {

  transform(value: any): string {
    if (value === parseInt(value)) {
      return value.toString();
    }
    
    let top = value.toString().includes('.') ? value.toString().replace(/\d+[.]/,'') : 0;
    const wholeNumber = Math.floor(value);
    const decimal = value - wholeNumber;
    const bottom = Math.pow(10, top.toString().replace('-','').length);

    if (decimal >= 1) {
      top = +top + (Math.floor(decimal) * bottom); 
    } else if (decimal <= -1) {
      top = +top + (Math.ceil(decimal) * bottom);
    }

    const x = Math.abs(this.greatestCommonDivisor(top, bottom));
    const fractionString = decimal === 0 ? '' : this.renderFraction(top / x, bottom / x);
    
    if (wholeNumber === 0) {
      return fractionString;
    }

    return wholeNumber + ' ' + fractionString;
  }

  private greatestCommonDivisor(a: number, b : number) : number {
    return (b) ? this.greatestCommonDivisor(b, a%b) : a;
  }

  private renderFraction(top: number, bottom: number) : string {
    String.fromCharCode()

    return top + "\u2044" + bottom;
  }

}
