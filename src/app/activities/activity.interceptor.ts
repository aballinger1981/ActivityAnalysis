import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class ActivityInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(event => {
      if (event instanceof HttpResponse && event.body.length) {
        const duplicate = event.clone({
          body: event.body.map(activity => {
            activity['average_pace'] = this.calculateAveragePace(activity['moving_time'], activity['distance']);
            activity['distance'] = this.calculateMiles(activity);
            return activity;
          })
        });
      } else if (event instanceof HttpResponse && !event.body['access_token']) {
        const activity = event.body;
        activity['average_pace'] = this.calculateAveragePace(activity['moving_time'], activity['distance']);
        activity['distance'] = this.calculateMiles(activity);
        activity['splits_standard'].map(split => {
          return split['pace'] = this.calculateAveragePace(split['moving_time'], split['distance']);
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
    let averagePace: string = (movingTime / distance).toFixed(2);
    let seconds: string = Math.round(+(averagePace.substring(averagePace.length - 3)) * 60).toString();
    if (Number.parseInt(seconds, 10) < 10) {
      seconds = '0' + seconds;
    } else if (seconds.length === 1) { seconds = '' + seconds + '0'; }
    averagePace = `${averagePace.substring(0, 1)}:${seconds}`;
    return averagePace;
  }

  private calculateMiles(activity): number {
    const miles: number = +(activity['distance'] / 1609.344).toFixed(2);
    return miles;
  }
}
