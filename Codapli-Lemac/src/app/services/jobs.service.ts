import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class JobsService {

  constructor(private http: HttpClient) { }

  getJobsFiles$(): Observable<any> {
    return this.http.get<any>(`/api/jobs`);
  }

}
