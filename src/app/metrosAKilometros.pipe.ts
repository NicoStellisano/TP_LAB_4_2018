import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'metrosAKilometros'})
export class metrosAKilometrosPipe implements PipeTransform {
  transform(value: number): number {
    debugger;
    return parseFloat((value/1000).toFixed(1));
  }
}