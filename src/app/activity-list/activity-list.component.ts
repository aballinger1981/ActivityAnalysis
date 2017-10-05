import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity-service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  constructor(
    public activityService: ActivityService
  ) { }

  ngOnInit() {
  }

}
