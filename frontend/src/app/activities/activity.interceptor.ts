import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class ActivityInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(event => {
      if (event instanceof HttpResponse && event.body.length
        && event.url !== 'https://www.strava.com/api/v3/athlete') {
        console.log(event);
        const duplicate = event.clone({
          body: event.body.map(activity => {
            activity['average_pace'] = this.calculateAveragePace(activity['moving_time'], activity['distance']);
            activity['distance'] = this.calculateMiles(activity);
            return activity;
          })
        });
      } else if (event instanceof HttpResponse && !event.body['access_token']
      && !event.body['all_run_totals'] && event.body['splits_standard']
        && event.url !== 'https://www.strava.com/api/v3/athlete') {
        console.log(event);
        const activity = event.body;
        activity['average_pace'] = this.calculateAveragePace(activity['moving_time'], activity['distance']);
        activity['distance_miles'] = this.calculateMiles(activity);
        activity['moving_time'] = this.calculateTotalTime(activity['moving_time']);
        activity['splits_standard'].map(split => {
          split['pace'] = this.calculateAveragePace(split['moving_time'], split['distance']);
          split['distance_miles'] = this.calculateMiles(split);
          return split;
        });
        const duplicate = event.clone({
          body: activity
        });
      }
    });
  }

  private calculateAveragePace(movingTime, distance): string {
    movingTime = (movingTime / 60).toFixed(2);
    distance = +(distance / 1609.344).toFixed(2);
    let minutes: string = (movingTime / distance).toFixed(2);
    let seconds: string = String(Math.round(+(minutes.substring(minutes.length - 3)) * 60));
    return this.addZeros(minutes, seconds);
  }

  private calculateTotalTime(movingTime: number): string {
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

  private addZeros(minutes, seconds, hours?): string {
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

  private calculateMiles(activity): number {
    const miles: number = +(activity['distance'] / 1609.344).toFixed(2);
    return miles;
  }
}
