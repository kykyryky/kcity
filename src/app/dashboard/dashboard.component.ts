import { Component, OnInit } from '@angular/core';
import { ContentService } from '../service/content.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  topics = [];
  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.list()
      .subscribe((data) => {
        this.topics = data;
      })
  }
}
