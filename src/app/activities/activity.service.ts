import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

interface ActivityListData {
  startDate: string;
  name: string;
}

export class Activity {
  constructor(
    public id: number,
    public name: string) { }
}

@Injectable()
export class ActivityService {
  private activitiesUrl: string = 'https://www.strava.com/api/v3/activities';
  public activityList: Observable<any>;

  constructor(
    private http: HttpClient
  ) { }

  public getActivities(): Observable<any> {
    if (this.activityList) { return this.activityList; }
    const headers: HttpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    const response = this.http.get(`${this.activitiesUrl}?per_page=10`, { headers });
    this.activityList = response;
    return response;
  }

  public getActivity(id: number | string) {
    const url: string = `https://www.strava.com/api/v3/activities/${id}`;
    const headers: HttpHeaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    const response = this.http.get(url, { headers });
    // response.subscribe(data => console.log(data));
    return response;
  }

}
