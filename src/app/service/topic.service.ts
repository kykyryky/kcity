import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TopicService {

  constructor(private http: HttpClient) { }

  add(data): Observable<any> {
    return this.http.post('topic', data);
  }

  list(): Observable<any> {
    return this.http.get('topic');    
  }

  get(id): Observable<any> {
    return this.http.get(`topic/${id}`);    
  }
}
