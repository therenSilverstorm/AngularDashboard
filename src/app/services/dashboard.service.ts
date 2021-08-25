import { Injectable, OnInit} from '@angular/core';
import {DashboardModel} from "../models/dashboard-model";
import {StatusEnum} from "../models/status-enum";
import {Platform} from '@angular/cdk/platform';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class DashboardService implements OnInit {
  dashboard: DashboardModel

  constructor(public platform: Platform, private http: HttpClient) {

  }

  getDashboard(): DashboardModel {
    this.dashboard = new DashboardModel();
    this.dashboard.status = StatusEnum.OFFLINE
    this.dashboard.os = 'Windows'
    this.dashboard.localTime = new Date().getTime()
    this.dashboard.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    this.dashboard.resolution = this.getScreenResolution()
    return this.dashboard
  }

  updateIp(ip) {
    this.dashboard.ip = ip
  }

  detectBrowser() {
    if (this.platform.EDGE) {
      this.dashboard.browser = 'Microsoft Edge'
    } else if (this.platform.FIREFOX) {
      this.dashboard.browser = 'Mozilla FireFox'
    } else if (this.platform.BLINK) {
      this.dashboard.browser = 'Chrome'
    } else if (this.platform.WEBKIT) {
      this.dashboard.browser = 'Opera'
    } else if (this.platform.TRIDENT) {
      this.dashboard.browser = 'Internet Explorer'
    } else if (this.platform.SAFARI) {
      this.dashboard.browser = 'Safari'
    }
  }

  getScreenResolution() {
    let width = window.screen.width * window.devicePixelRatio;
    let height = window.screen.height * window.devicePixelRatio;
    return width + 'x' + height;
  }


  getIp() {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
      this.updateIp(res.ip)
    })
  }



  ngOnInit(): void {
    this.getIp()

  }


}
