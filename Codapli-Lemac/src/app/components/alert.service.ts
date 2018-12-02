import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class AlertCodapliService {

    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
       router.events.subscribe(event => {
       if (event instanceof NavigationStart) {
          if (this.keepAfterNavigationChange) {
              this.keepAfterNavigationChange = false;
          } else {
              this.subject.next();
          }
       }
   });
   }

   alert(message: string, keepAfterNavigationChange = false) {
       this.keepAfterNavigationChange = keepAfterNavigationChange;
       this.subject.next(message);
   }

   closeAlert() {
    this.subject.next();
}

   getMessage(): Observable<any> {
        return this.subject.asObservable();
   }

}