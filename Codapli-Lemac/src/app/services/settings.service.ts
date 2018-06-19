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

  setSettings(settings:Setting):Observable<any> {
    console.log('sending post job');
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`api/settings`, settings, { headers: header });
  }

  getSettings():Observable<Setting> {
    return this.http.get<Setting>(`api/settings`);
  }


}
