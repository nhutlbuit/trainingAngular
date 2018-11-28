import { Pipe, PipeTransform } from '@angular/core';
import { Scope } from '../../model/scope';

@Pipe({name: 'arrayToString'})
export class ArrayToStringPipe implements PipeTransform {
  transform(arr: Scope[]): string {
    let value = '';
    if (undefined !== arr && arr.length > 0) {
        value = arr.map(item => {
            return item['scopeValue'];
          }).join(' ');
    }
    return value;
  }
}
