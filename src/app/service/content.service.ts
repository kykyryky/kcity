import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContentService {

  constructor(private http: HttpClient) { }

  add(data): Observable<any> {
    return this.http.post('content', data);
  }

  list(): Observable<any> {
    return this.http.get('content');    
  }

  get(id): Observable<any> {
    return this.http.get(`content/${id}`);    
  }
}
