import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommentService {

  constructor(private http: HttpClient) { }

  add(data): Observable<any> {
    return this.http.post('comment', data);
  }

  list(topicId): Observable<any> {
    return this.http.get(`comment/${topicId}`);    
  }
}
