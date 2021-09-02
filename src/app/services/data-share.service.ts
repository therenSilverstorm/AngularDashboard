import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  myMethod$: Observable<any>;
  private myMethodSubject = new Subject<any>();

  constructor() {
    this.myMethod$ = this.myMethodSubject.asObservable();
  }

  //Changing DashboardModel status (EnumStatus)
  shareData(data) {
    console.log(JSON.stringify(data));
    this.myMethodSubject.next(data);
  }

}
