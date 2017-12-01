import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import { Activity, ActivityService } from '../activity.service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/merge';

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
  @ViewChild(MatSort) sort: MatSort;

  public selectedId: number;
  public displayedColumns = ['start_date', 'distance', 'average_pace', 'type'];
  public dataSource: ActivityDataSource | null;
  public selectedRowIndex: number;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedId = +params.get('id');
      this.activityService.pageIndex = +params.get('page');
      this.activityService.pageSize = +params.get('per_page');
    });
    this.activityService.getAthlete();
    this.activityService.getActivities();
    this.dataSource = new ActivityDataSource(this.activityService,
      this.paginator, this.sort);
  }

  public highlightRow(row): void {
    this.selectedRowIndex = row.id;
  }

}

export class ActivityDataSource extends DataSource<any> {
  public renderedData: any[] = [];

  constructor(
    private activityService: ActivityService,
    private paginator: MatPaginator,
    private sort: MatSort
  ) {
    super();
  }

  connect(): Observable<any[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
    this.activityService.dataChange,
    this.sort.sortChange,
    this.paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const sortedData = this.sortData(this.activityService.data.slice());
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      this.renderedData = sortedData.splice(0, this.paginator.pageSize);
      return this.renderedData;
    });
    // return this.activityService.dataChange;
  }

  public sortData(data: any[]): any[] {
    if (!this.sort.active || this.sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this.sort.active) {
        case 'start_date': [propertyA, propertyB] = [a.start_date, b.start_date]; break;
        case 'distance': [propertyA, propertyB] = [a.distance, b.distance]; break;
        case 'average_pace': [propertyA, propertyB] = [a.average_pace, b.average_pace]; break;
        case 'type': [propertyA, propertyB] = [a.type, b.type]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
    });
  }

  disconnect() { }
}
