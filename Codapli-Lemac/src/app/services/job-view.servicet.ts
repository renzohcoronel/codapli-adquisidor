import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class jobViewService {

  constructor(private http: HttpClient) { }

  getJob$(): Observable<any> {
    return this.http.get<any>(`/api/job`);
  }

  viewJob$(file:String): Observable<any>{
    return this.http.get<any>(`/api/job/${file}`);
  }

  downloadJob$(file:String): Observable<any>{
    return this.http.get<any>(`/api/job/download/${file}`);
  }

}
