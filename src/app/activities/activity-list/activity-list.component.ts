import { Component, OnInit } from '@angular/core';
import { ActivityStoreService } from '../activity-store.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  constructor(
    public activityStore: ActivityStoreService
  ) { }

  ngOnInit() {
  }

}
