import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure: false
})
export class OrderByPipe implements PipeTransform {

  transform(arr: Array<any>, field: string, order: 'up' | 'down' = 'down') {
    return arr?.sort((a, b) => {
      const value1 = a[field];
      const value2 = b[field];

      if (value1 > value2) {
        return order === 'up' ? 1 : -1;
      }
      else if (value1 < value2) {
        return order === 'up' ? -1 : 1;
      }

      return 0;
    });
  }

}
