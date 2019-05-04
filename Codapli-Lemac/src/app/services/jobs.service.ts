import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JobsService {
  constructor(private http: HttpClient) {}

  getJobsFiles$(): Observable<any> {
    return this.http.get<any>(`/api/jobs`);
  }

  postJob$(job: any): Observable<any> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`api/job/`, job, { headers: header });
  }

  deleteJob$(file: String): Observable<any> {
    return this.http.delete<any>(`/api/job/${file}`);
  }

  downloadJob$(file: String): Observable<any> {
    const HTTPOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/csv'
      }),
      'responseType': 'blob' as 'json'
   };
    return this.http.get<any>(`/api/job/download/${file}`, HTTPOptions);
  }

  getJob$(): Observable<any> {
    return this.http.get<any>(`/api/job`);
  }

  getJobForFile$(file: String): Observable<any> {
    return this.http.get<any>(`/api/job/${file}`);
  }


  startJob$(): Observable<any> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`/api/job/start`, null, { headers: header });
  }

  stopJob$(): Observable<any> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`/api/job/stop`, null, { headers: header });
  }
}
