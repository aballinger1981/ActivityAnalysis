import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

export class Activity {
  constructor(public id: number, public name: string) { }
}

const ACTIVITIES: Activity[] = [
  new Activity(11, 'Run11'),
  new Activity(12, 'Run12'),
  new Activity(13, 'Run13')
];

@Injectable()
export class ActivityService {

  constructor() { }

  public getActivities(): Observable<any> {
    return Observable.of(ACTIVITIES);
  }

  public getActivity(id: number | string) {
    return this.getActivities()
    // (+) before `id` turns the string into a number
      .map(activities => activities.find(activity => activity.id === +id));
  }

}
