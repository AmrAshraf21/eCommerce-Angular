import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundPricePipe'
})
export class RoundPricePipePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return Math.round(value) ;
  }

}
