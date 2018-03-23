import { Component, OnInit } from '@angular/core';
import { TopicService } from '../service/topic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  topics = [];
  constructor(private topicService: TopicService) { }

  ngOnInit() {
    this.topicService.list()
      .subscribe((data) => {
        this.topics = data;
      })
  }
}
