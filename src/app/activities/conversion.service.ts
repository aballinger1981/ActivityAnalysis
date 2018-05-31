import { Injectable } from '@angular/core';

@Injectable()
export class ConversionService {

  constructor() { }

  public calculateAveragePace(movingTime, distance): string {
    movingTime = (movingTime / 60).toFixed(2);
    distance = +(distance / 1609.344).toFixed(2);
    const minutes: string = (movingTime / distance).toFixed(2);
    const seconds: string = String(Math.round(+(minutes.substring(minutes.length - 3)) * 60));
    return this.convertTime(minutes, seconds);
  }

  public calculateTotalTime(movingTime: number): string {
    let minutes: string = (movingTime / 60).toFixed(2);
    if (+(minutes) > 59.99) {
      const hours: string = (+(minutes) / 60).toFixed(2);
      minutes = (60 * +(hours.substring(hours.length - 3))).toFixed(2);
      const totalSeconds: string = String(Math.floor(60 * +(minutes.substring(minutes.length - 3))));
      return this.convertTime(minutes, totalSeconds, hours);
    }
    const seconds: string = String(Math.floor(60 * +(minutes.substring(minutes.length - 3))));
    return this.convertTime(minutes, seconds);
  }

  public convertTime(minutes, seconds, hours?): string {
    seconds = this.addZeros(seconds);
    minutes = this.addZeros(minutes);
    const minutesDecimal: number = minutes.indexOf('.');
    if (hours) {
      hours = this.addZeros(hours);
      const hoursDecimal: number = hours.indexOf('.');
      return `${hours.substring(0, hoursDecimal)}:${minutes.substring(0, minutesDecimal)}:${seconds}`;
    } else {
      return `${minutes.substring(0, minutesDecimal)}:${seconds}`;
    }
  }

  public addZeros(time): string {
    if (Number.parseInt(time, 10) < 10) {
      time = '0' + time;
    } else if (time.length === 1) {
      time = '' + time + '0';
    }
    return time;
  }

  public calculateMiles(activity): number {
    const miles: number = +(activity['distance'] / 1609.344).toFixed(2);
    return miles;
  }
}
