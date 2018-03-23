import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../service/comment.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() topicId: string;

  comments = [];

  constructor(private commentService: CommentService) { }

  ngOnChanges() {
    if (!this.topicId) {
      return;
    }

    this.commentService.list(this.topicId)
      .subscribe((comments) => {
        this.comments = comments;
      });
  }

  ngOnInit() {}

}
