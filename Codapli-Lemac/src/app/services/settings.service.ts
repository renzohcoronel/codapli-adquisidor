import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Setting } from '../models/setting';

@Injectable()
export class SettingsService {

  constructor(private http: HttpClient) { }

  initSerialSetting():Observable<any>{
    return this.http.get(`api/init/settings`);
  }

  closeSerialSetting():Observable<any>{
    return this.http.get(`api/close/settings`);
  }

  Setlvdts$(settings:any):Observable<any> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`api/settings/lvdts`, settings, { headers: header });
  }

  SetCelda$(settings:any):Observable<any> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`api/settings/celda`, settings, { headers: header });
  }

  SetTara$():Observable<any> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`api/settings/tara`, {}, { headers: header });
  }

  SetInterval$(interval:any):Observable<any> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`api/settings/interval`, {time:interval}, { headers: header });
  }
  
  getSettings():Observable<Setting> {
    return this.http.get<Setting>(`api/settings`);
  }


}
