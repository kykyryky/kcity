import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../service/comment.service';

@Component({
  selector: 'comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() topicId: string;
  @Input() parent: string;
  comment = '';
  loading = false;

  constructor(private commentService: CommentService) { }

  ngOnInit() {}
  add() {
    this.loading = true;
    const comment = {topic: this.topicId, parent: this.parent, comment: this.comment};
    this.commentService.add(comment)
      .subscribe(
        (data) => {
          this.comment = '';
          this.loading = false;
        },
        () => {
          this.loading = false
        }
      );
  }
}
