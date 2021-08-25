import {Component, DoCheck, OnInit,} from '@angular/core';
import {DashboardService} from "../services/dashboard.service";
import {DashboardModel} from "../models/dashboard-model";
import {WebsocketService} from "../services/websocket.service";
import {StatusEnum} from "../models/status-enum";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, DoCheck {

  dashboard: DashboardModel
  subject: any

  constructor(private dashboardService: DashboardService, private ws: WebsocketService) {
    dashboardService.ngOnInit();

  }

  ngDoCheck(dashboard: DashboardModel = this.dashboard): void {
    this.subject = this.ws.getSubject(this.dashboard);
  }


  ngOnInit(): void {
    this.dashboard = this.dashboardService.getDashboard();
    this.dashboardService.detectBrowser()

  }

  connect() {
    this.subject.subscribe(
      err => this.disconnect(),
      () => this.disconnect(),
    )

  }

  disconnect() {
    this.subject.complete()
    this.dashboard.status = StatusEnum.OFFLINE
  }


}
