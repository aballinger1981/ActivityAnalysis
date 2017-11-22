import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
  public activityList: Object;
  public athleteId: number;
  public activityTotal: number;
  public dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  get data(): any[] { return this.dataChange.value; }

  constructor(
    private http: HttpClient
  ) { }

  public getAthlete(): void {
    const url: string = 'https://www.strava.com/api/v3/athlete';
    const headers: HttpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    const response = this.http.get(url, { headers });
    response.subscribe(data => {
      this.athleteId = data['id'];
      console.log(this.athleteId, data);
      this.getActivityTotal();
    });
  }

  public getActivityTotal(): void {
    const url: string = `https://www.strava.com/api/v3/athletes/${this.athleteId}/stats`;
    const headers: HttpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    const response = this.http.get(url, { headers });
    response.subscribe(data => {
      this.activityTotal = data['all_ride_totals']['count'] + data['all_run_totals']['count'] +
        data['all_swim_totals']['count'];
      console.log(this.activityTotal);
    });
  }

  public getActivities(): Observable<any> {
    if (this.activityList) { return Observable.of(this.activityList); }
    const headers: HttpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    const response = this.http.get(`${this.activitiesUrl}?page=1`, { headers });
    response.subscribe(data => {
      this.activityList = data;
    });
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
