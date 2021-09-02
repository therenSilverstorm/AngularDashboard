import {
  Component,
  HostListener,
  OnInit
} from '@angular/core';
import {DashboardService} from "../services/dashboard.service";
import {DashboardModel} from "../models/dashboard-model";
import {DataShareService} from "../services/data-share.service";
import {Store} from "@ngrx/store";
import {StatusEnum} from "../models/status-enum";
import {Ng2StompjsService} from "../services/ng2-stompjs.service";
import {State} from "../store/status/state";
import {disconnected} from "../store/status/status.actions";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  dashboard: DashboardModel

  constructor(private dashboardService: DashboardService, private dataShare: DataShareService, private store: Store,
              private websocket: Ng2StompjsService, private statusStore: Store<State>) {

    this.dashboard = this.dashboardService.getDashboard()

    this.dataShare.myMethod$.subscribe((data) => {
      this.dashboard.status = data
    });
  }

  ngOnInit(): void {
    this.websocket.disconnected$.subscribe(() => {
      this.dataShare.shareData(StatusEnum.OFFLINE)
      this.statusStore.dispatch(new disconnected())
    });
  }

  //Connects to Websocket
  connect() {
    this.websocket.subscribe(this.dashboard)
  }

  //Disconnects from Websocket
  disconnect() {
    this.websocket.unsubscribe(this.dashboard)
  }


  //Listening to 'beforeunload' event, in case of force tab close.
  @HostListener('window:beforeunload', ['$event'])
  async onBeforeUnload(): Promise<void> {
    this.websocket.unsubscribe(this.dashboard);
  }


}
