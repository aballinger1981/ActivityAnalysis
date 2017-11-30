import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import { Activity, ActivityService } from '../activity.service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material';

interface ActivityData {
  start_date: string;
  name: string;
}

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})

export class ActivityListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public selectedId: number;
  public displayedColumns = ['start_date', 'distance', 'average_pace', 'type'];
  public dataSource: ActivityDataSource | null;
  public selectedRowIndex: number;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute
  ) {
    this.dataSource = new ActivityDataSource(activityService, this.paginator);
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedId = +params.get('id');
      this.activityService.pageIndex = +params.get('page');
      this.activityService.pageSize = +params.get('per_page');
    });
    this.activityService.getAthlete();
    this.activityService.getActivities();
  }

  public highlightRow(row): void {
    this.selectedRowIndex = row.id;
  }

}

export class ActivityDataSource extends DataSource<any> {
  constructor(
    private activityService: ActivityService,
    private paginator: MatPaginator
  ) { super(); }

  connect(): Observable<any> {
    return this.activityService.dataChange;
  }

  disconnect() { }
}
