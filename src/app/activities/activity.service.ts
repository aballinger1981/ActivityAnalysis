import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

export class Activity {
  constructor(
    public id: number,
    public name: string) { }
}

@Injectable()
export class ActivityService {
  private activitiesUrl: string = 'https://www.strava.com/api/v3/activities';
  public activityList: Object;

  constructor(
    private http: HttpClient
  ) { }

  public getActivities(): Observable<any> {
    if (this.activityList) { return Observable.of(this.activityList); }
    const headers: HttpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    const activities$ = this.http.get(this.activitiesUrl, { headers });
    activities$.subscribe(data => this.activityList = data);
    return activities$;
  }

  public getActivity(id: number | string) {
    const url: string = `https://www.strava.com/api/v3/activities/${id}`;
    const headers: HttpHeaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    return this.http.get(url, { headers });
    // return this.getActivities()
    // // (+) before `id` turns the string into a number
    //   .map(activities => activities.find(activity => activity.id === +id));
  }

}
