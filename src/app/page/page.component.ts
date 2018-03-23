import { Component, OnInit } from '@angular/core';
import { TopicService } from '../service/topic.service';
import { ActivatedRoute } from "@angular/router";
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  page = {files: []};
  current = null;

  constructor(private route: ActivatedRoute, private topicService: TopicService) {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        topicService.get(params['id'])
          .subscribe((data) => {            
            this.page = data;
            this.current = data.files ? data.files[0] : null;
          });
      }
    });
  }

  ngOnInit() {
  }

  setCurrent(current) {
    this.current = current;
  }

  move(direction) {
    if (!this.page.files) {
      return;
    }
    let index = this.page.files.indexOf(this.current);
    if (direction) {
      index++;
      this.current = this.page.files[index < this.page.files.length ? index : 0];
    } else {
      index--;
      this.current = this.page.files[index < 0 ? this.page.files.length : index];
    }
  }
}
