import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ConversionService } from './conversion.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class ActivityInterceptor implements HttpInterceptor {

  constructor(
    private conversionService: ConversionService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(event => {
      if (event instanceof HttpResponse && event.body.length
        && event.url !== 'https://www.strava.com/api/v3/athlete') {
        console.log(event);
        const duplicate = event.clone({
          body: this.activityListConversions(event)
        });
      } else if (event instanceof HttpResponse && !event.body['access_token']
      && !event.body['all_run_totals'] && event.body['splits_standard']
        && event.url !== 'https://www.strava.com/api/v3/athlete') {
        console.log(event);
        const duplicate = event.clone({
          body: this.activityDetailConversions(event)
        });
      }
    });
  }

  private activityListConversions(event) {
    return event.body.map(activity => {
      activity['average_pace'] = this.conversionService.calculateAveragePace(activity['moving_time'], activity['distance']);
    activity['distance'] = this.conversionService.calculateMiles(activity);
    return activity;
    });
  }

  private activityDetailConversions(event) {
    const activity = event.body;
    activity['average_pace'] = this.conversionService.calculateAveragePace(activity['moving_time'], activity['distance']);
    activity['distance_miles'] = this.conversionService.calculateMiles(activity);
    activity['moving_time'] = this.conversionService.calculateTotalTime(activity['moving_time']);
    activity['splits_standard'].map(split => {
      split['pace'] = this.conversionService.calculateAveragePace(split['moving_time'], split['distance']);
      split['distance_miles'] = this.conversionService.calculateMiles(split);
      return split;
    });
    return activity;
  }
}
