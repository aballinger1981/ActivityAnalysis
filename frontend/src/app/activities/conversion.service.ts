import { Injectable } from '@angular/core';

@Injectable()
export class ConversionService {

  constructor() { }

  public calculateAveragePace(movingTime, distance): string {
    movingTime = (movingTime / 60).toFixed(2);
    distance = +(distance / 1609.344).toFixed(2);
    let minutes: string = (movingTime / distance).toFixed(2);
    let seconds: string = String(Math.round(+(minutes.substring(minutes.length - 3)) * 60));
    return this.addZeros(minutes, seconds);
  }

  public calculateTotalTime(movingTime: number): string {
    let minutes: string = (movingTime / 60).toFixed(2);
    if (+(minutes) > 59.99) {
      const hours: string = (+(minutes) / 60).toFixed(2);
      minutes = (60 * +(hours.substring(hours.length - 3))).toFixed(2);
      const seconds: string = String(Math.floor(60 * +(minutes.substring(minutes.length - 3))));
      return this.addZeros(minutes, seconds, hours);
    }
    const seconds: string = String(Math.floor(60 * +(minutes.substring(minutes.length - 3))));
    return this.addZeros(minutes, seconds);
  }

  public addZeros(minutes, seconds, hours?): string {
    const minutesDecimal: number = minutes.indexOf('.');
    if (Number.parseInt(seconds, 10) < 10) {
      seconds = '0' + seconds;
    } else if (seconds.length === 1) {
      seconds = '' + seconds + '0';
    }
    if (hours) {
      const hoursDecimal: number = hours.indexOf('.');
      return `${hours.substring(0, hoursDecimal)}:${minutes.substring(0, minutesDecimal)}:${seconds}`;
    } else {
      return `${minutes.substring(0, minutesDecimal)}:${seconds}`;
    }
  }

  public calculateMiles(activity): number {
    const miles: number = +(activity['distance'] / 1609.344).toFixed(2);
    return miles;
  }
}
