import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
  public activityList: Object;
  public athleteId: number;
  public activityTotal: number;
  public pageEvent: PageEvent;
  public pageIndex: number;
  public pageSize: number;
  public dataChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  get data(): any[] { return this.dataChange.value; }

  constructor(
    private http: HttpClient
  ) { }

  public getAthlete(): Observable<any> {
    if (this.athleteId) { return; }
    const url: string = 'https://www.strava.com/api/v3/athlete';
    const headers: HttpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    const response = this.http.get(url, { headers });
    response.subscribe(data => {
      this.athleteId = data['id'];
    });
    return response;
  }

  public getActivityTotal(): Observable<any> {
    const url: string = `https://www.strava.com/api/v3/athletes/${this.athleteId}/stats`;
    const headers: HttpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    const response = this.http.get(url, { headers });
    response.subscribe(data => {
      this.activityTotal = data['all_ride_totals']['count'] + data['all_run_totals']['count'] +
        data['all_swim_totals']['count'];
    });
    return response;
  }

  public getActivities(event?: PageEvent): Observable<any> {
    console.log(event);
    let index: number;
    !event ? index = 1 : index = event.pageIndex + 1;
    // if (this.activityList) { return Observable.of(this.activityList); }
    !event ? this.pageSize = 10 : this.pageSize = event.pageSize;
    !event ? this.pageIndex = 0 : this.pageIndex = event.pageIndex;
    const url: string = 'https://www.strava.com/api/v3/athlete/activities';
    const headers: HttpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    const response = this.http.get(`${url}?page=${index}&per_page=${this.pageSize}`, { headers });
    response.subscribe(data => {
      this.activityList = data;
    });
    this.dataChange.next(response);
    return response;
  }

  public getActivity(id: number | string) {
    const url: string = `https://www.strava.com/api/v3/activities/${id}`;
    const headers: HttpHeaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    const response = this.http.get(url, { headers });
    response.subscribe(data => console.log(data));
    return response;
  }

}
