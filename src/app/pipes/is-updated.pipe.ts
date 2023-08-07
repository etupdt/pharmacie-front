import { NgIterable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isUpdated'
})
export class IsUpdatedPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): NgIterable<any> {
    return value;
  }

}
