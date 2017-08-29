import { Pipe } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe {

  // Comparator method
  static comparator(a: any, b: any): number {
    if (a === null || typeof a === 'undefined') a = 0;
    if (b === null || typeof b === 'undefined') b = 0;

    if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
      // lowercase strings
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
    } else {
      // ensure number values
      if (parseFloat(a) < parseFloat(b)) return -1;
      if (parseFloat(a) > parseFloat(b)) return 1;
    }

    return 0; // values are equal
  }

  // Actual value transformation
  transform(value: Array<any>, property: string): any {
    return value.sort(function (a: any, b: any) {
      let aValue = a[property];
      let bValue = b[property];
      let comparison = OrderByPipe.comparator(aValue, bValue);
      if (comparison != 0) return comparison;
      return 0; // values are equal
    });
  }  
}