import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import { Activity, ActivityService } from '../activity.service';
import { DataSource } from '@angular/cdk/collections';

interface ActivityData {
  start_date: string;
  name: string;
}

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  public activities$: Observable<any>;
  public selectedId: number;
  public displayedColumns = ['start_date', 'type'];
  public dataSource: ExampleDataSource | null;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute
  ) {
    this.dataSource = new ExampleDataSource(activityService);
   }

  ngOnInit() {
    this.activities$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.selectedId = +params.get('id');
        return this.activityService.getActivities();
      });
  }
}

export class ExampleDataSource extends DataSource<any> {
  constructor(
    private activityService: ActivityService
  ) { super(); }

  connect(): Observable<any> {
    return this.activityService.getActivities();
  }

  disconnect() { }
}
