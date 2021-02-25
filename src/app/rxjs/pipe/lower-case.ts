import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'lower',
    pure: true
  })
  export class LowerCase implements PipeTransform {
    transform(input: string): string {
      return input?.toLowerCase();
    }
  }
