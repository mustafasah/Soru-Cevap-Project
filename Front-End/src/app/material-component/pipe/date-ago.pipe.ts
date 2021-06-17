import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {


  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29)
        return 'Az Önce';
      const intervals: any = {
        'Yıl': 31536000,
        'Ay': 2592000,
        'Hafta': 604800,
        'Gün': 86400,
        'Saat': 3600,
        'Dakika': 60,
        'Saniye': 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
          if (counter === 1) {
            return counter + ' ' + i + ' önce';
          } else {
            return counter + ' ' + i + 'önce';
          }
      }
    }
    return value;
  }

}
