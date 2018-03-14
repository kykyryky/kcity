import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UploadService {

  constructor(private http: HttpClient) { }

  upload(data): Observable<any> {
    return this.http.post('image', data);
  }

  get(uuid): Observable<any> {
    return this.http.get(`image/${uuid}`);
  }

  delete(uuid): Observable<any> {
    return this.http.delete(`image/${uuid}`);
  }
}
