import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/skip';
import { Activity, ActivityService } from '../activity.service';
import { DataSource } from '@angular/cdk/collections';
import 'chart.js';
import * as polyline from 'polyline';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss'],
  animations: [  ]
})

export class ActivityDetailComponent implements OnInit {
  public activity$: Observable<any>;
  public pageIndex: number;
  public pageSize: number;
  public displayedColumns = ['split', 'distance_miles', 'pace', 'elevation_difference'];
  public dataSource: ActivityDataSource | null;
  public coordinates: Array<number[]>;
  public startLatLong: number[];
  public endLatLong: number[];
  public strokeColor: string = '#e60000';
  public chartIsLoaded: boolean;
  public data: number[] = [];
  public lineChartLabels: number[] = [];
  public lineChartData: any[] = [
    {data: this.data, label: 'Pace Chart'}
  ];
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService,
  ) { }

  ngOnInit() {
    this.activity$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.pageIndex = +params.get('page');
        this.pageSize = +params.get('per_page');
        return this.activityService.getActivity(params.get('id'));
      });
    this.setNavData();
    this.activityService.activityChange.skip(1).subscribe(() => {
      this.getMapAndChartData();
    });
    this.dataSource = new ActivityDataSource(this.activityService);
  }

  public setNavData(): void {
    if (!this.activityService.athleteData) {
      if (!this.activityService.athleteId) {
        this.activityService.getAthlete();
      } else {
        this.activityService.getAthleteData();
      }
    }
  }

  public getMapAndChartData(): void {
    const activity = this.activityService.activityChange.value;
    this.coordinates = polyline.decode(String(activity['map']['polyline']));
    this.startLatLong = activity['start_latlng'];
    this.endLatLong = activity['end_latlng'];
    activity['splits_standard'].forEach(split => {
      this.data.push(split['moving_time']);
      this.lineChartLabels.push(split['split']);
    });
    this.chartIsLoaded = true;
  }

  public goToActivities(activity: Activity): void {
    const activityId = activity ? activity.id : null;
    // Pass along the activity id if available
    // So that the ActivityList component can select that activity.
    this.router.navigate(['/activity-list', { id: activityId, page: this.pageIndex, per_page: this.pageSize }]);
  }

}

export class ActivityDataSource extends DataSource<any> {

  constructor(
    private activityService: ActivityService
  ) {
    super();
  }

  connect(): Observable<any> {
    return this.activityService.activityChange.map((activity) => {
      return activity['splits_standard'];
    });
  }

  disconnect() {

  }
}
