import {
  Component,
   HostListener,
  OnInit
} from '@angular/core';
import {DashboardService} from "../services/dashboard.service";
import {DashboardModel} from "../models/dashboard-model";
import {WebsocketService} from "../services/websocket.service";

import {DataShareService} from "../services/data-share.service";
import {Store} from "@ngrx/store";
import {StatusEnum} from "../models/status-enum";

import {Ng2StompjsService} from "../services/ng2-stompjs.service";
import {State} from "../store/status/state";
import {connected, disconnected} from "../store/status/status.actions";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {


  dashboard: DashboardModel


  constructor(private dashboardService: DashboardService, private ws: WebsocketService, private dataShare: DataShareService,
              private store: Store, private test : Ng2StompjsService, private statusStore : Store<State>) {

    this.dashboard = this.dashboardService.getDashboard()

    this.dataShare.myMethod$.subscribe((data) => {
      this.dashboard.status = data
    });



   // this.dataShare.shareData(this.dashboard)
   //  if (this.dashboard.ip !== undefined) {
   //    //this.ws.connect(this.dashboard)
   //    this.test.subscribe(this.dashboard)
   //  } else {
   //    setTimeout(() => {
   //      //this.ws.connect(this.dashboard)
   //      this.test.subscribe(this.dashboard)
   //    }, 1000)
   //  }




  }


  ngOnInit(): void {
    this.test.disconnected$.subscribe(() => {
      this.dataShare.shareData(StatusEnum.OFFLINE)
      this.statusStore.dispatch(new disconnected())
    });
  }

  connect() {
    this.test.subscribe(this.dashboard)
  }

  disconnect() {
    this.test.unsubscribe(this.dashboard)
  }



  CHANGE
  @HostListener('window:beforeunload', ['$event'])
  async onBeforeUnload(): Promise<void> {
     this.test.unsubscribe(this.dashboard);
  }





}
