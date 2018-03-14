import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../service/content.service';
import { UploadService } from '../service/upload.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title = '';
  description = '';
  content = '';
  tags = '';
  show = false;
  loading = false;
  Name:string; 
  files = [];

  constructor(private contentService: ContentService, private uploadService: UploadService, private router: Router) { }

  ngOnInit() {}

  add() {
    const ctrl = this;
    ctrl.loading = true;
    let latitude = 59.875330;
    let longitude = 30.981457;
    if (navigator.geolocation) {      
      navigator.geolocation.getCurrentPosition((location) => {        
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
        ctrl._create({latitude, longitude});
      }, () => {
        ctrl._create({latitude, longitude})
      });
    } else {
      this._create({latitude, longitude});
    }    
  }

  _create(coords) {
    this.contentService.add({
      title: this.title,
      description: this.description,
      content: this.content,
      tags: this.tags,
      show: this.show,
      files: this.files,
      coords: [coords.latitude, coords.longitude]
    })
    .subscribe(
      (data) => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      () => {
        this.loading = false
      }
    );
  }

  deleteImage(file) {
    this.uploadService.delete(file)
      .subscribe((data) => {
        const index = this.files.indexOf(file);
        if (index !== -1) {
          this.files.splice(index, 1);
        }
      });
  }

  onSelect(event) {
    const files = event.target.files; 
    if (!files || !files.length) {
        return;
    }
    for (const file of files)  {
      this.upload(file);
    }    
  }

  upload(file): void {
    let formdata: FormData = new FormData();
    formdata.append('file', file);

    this.uploadService.upload(formdata)
      .subscribe((data) => {
        this.files.push(data);
      });
  }
}
