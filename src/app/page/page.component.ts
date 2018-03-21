import { Component, OnInit } from '@angular/core';
import { ContentService } from '../service/content.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  page = {};
  current = null;
  constructor(private route: ActivatedRoute, private contentService: ContentService) {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        contentService.get(params['id'])
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

}
