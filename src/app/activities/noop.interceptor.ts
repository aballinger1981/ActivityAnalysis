import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(event => {
      if (event instanceof HttpResponse && event.body.length) {
        const duplicate = event.clone({
          body: event.body.map(activity => {
            return activity['average_pace'] = this.calculateAveragePace(activity);
          })
        });
      } else if (event instanceof HttpResponse) {
        const activity = event.body;
        const duplicate = event.clone({
          body: activity['average_pace'] = this.calculateAveragePace(activity)
        });
      }
    });
  }

  private calculateAveragePace(activity): string {
    const movingTime = activity['moving_time'] / 60;
    const distance: number = +(activity['distance'] / 1609.344).toFixed(2);
    let averagePace = (movingTime / distance).toFixed(2).toString();
    let seconds = Math.round(+(averagePace.substring(averagePace.length - 3)) * 60).toString();
    if (seconds.length === 1) { seconds = '' + seconds + '0'; }
    averagePace = `${averagePace.substring(0, 1)}:${seconds}`;
    return averagePace;
  }
}
