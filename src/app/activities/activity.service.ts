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

  public getAthlete(): void {
    if (this.athleteId) { this.getActivityTotal(); }
    const url: string = 'https://www.strava.com/api/v3/athlete';
    const headers: HttpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    const response = this.http.get(url, { headers });
    response.subscribe(data => {
      this.athleteId = data['id'];
      this.getActivityTotal();
    });
  }

  public getActivityTotal(): void {
    if (this.activityTotal) { return; }
    const url: string = `https://www.strava.com/api/v3/athletes/${this.athleteId}/stats`;
    const headers: HttpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    const response = this.http.get(url, { headers });
    response.subscribe(data => {
      this.calculateActivityTotal(data);
    });
  }

  public getActivities(event?: PageEvent): Observable<any> {
    let index: number;
    if (!event && !this.pageIndex) {
      index = 1;
    } else if (!event && this.pageIndex) {
      index = this.pageIndex + 1;
    } else if (event && (!this.pageIndex || this.pageIndex)) {
      this.pageIndex = event.pageIndex;
      index = event.pageIndex + 1;
    }
    if (!event && !this.pageSize) {
      this.pageSize = 10;
    } else if (event) {
      this.pageSize = event.pageSize;
    }
    const url: string = 'https://www.strava.com/api/v3/athlete/activities';
    const headers: HttpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    const response = this.http.get(`${url}?page=${index}&per_page=${this.pageSize}`, { headers });
    response.subscribe((activities) => {
      this.dataChange.next(activities);
    });
    return response;
  }

  public getActivity(id: number | string) {
    const url: string = `https://www.strava.com/api/v3/activities/${id}`;
    const headers: HttpHeaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    const response = this.http.get(url, { headers });
    return response;
  }

  public calculateActivityTotal(data): void {
    this.activityTotal = data['all_ride_totals']['count'] + data['all_run_totals']['count'] +
    data['all_swim_totals']['count'];
  }

}
