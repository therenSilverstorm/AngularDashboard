import {Injectable} from '@angular/core';
import {DashboardModel} from "../models/dashboard-model";
import {StatusEnum} from "../models/status-enum";
import {Platform} from '@angular/cdk/platform';
import {HttpClient} from "@angular/common/http";
import {UUID} from "angular2-uuid";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  dashboard: DashboardModel

  constructor(public platform: Platform, private http: HttpClient) {

  }

  getDashboard(): DashboardModel {
    if (this.dashboard === undefined) {
      this.dashboard = new DashboardModel();
      this.dashboard.status = StatusEnum.OFFLINE;
      this.dashboard.os = 'Windows';
      this.dashboard.localTime = new Date().getTime();
      this.dashboard.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.dashboard.resolution = this.getScreenResolution();
      this.dashboard.id = this.getId();
      this.getIp();
      this.updateBrowser();
    }
    return this.dashboard;
  }

  updateIp(ip) {
    this.dashboard.ip = ip
  }

  updateBrowser() {
    this.dashboard.browser = this.detectBrowser()
  }

  detectBrowser(): string {
    if (this.platform.EDGE) {
      return 'Microsoft Edge'
    } else if (this.platform.FIREFOX) {
      return 'Mozilla FireFox'
    } else if (this.platform.BLINK) {
      return 'Chrome'
    } else if (this.platform.WEBKIT) {
      return 'Opera'
    } else if (this.platform.TRIDENT) {
      return 'Internet Explorer'
    } else if (this.platform.SAFARI) {
      return 'Safari'
    } else {
      return "Not detected"
    }
  }

  getScreenResolution() {
    let width = window.screen.width * window.devicePixelRatio;
    let height = window.screen.height * window.devicePixelRatio;
    return width + 'x' + height;
  }


  getIp() {
    this.http.get(environment.ipify).subscribe((res: any) => {
      this.updateIp(res.ip)
    })
  }

  getId(): any {
    let id = sessionStorage.getItem('id')
    if (id == null) {
      id = UUID.UUID();
      sessionStorage.setItem('id', id)
    }
    console.log(id)
    console.log()
    return id;

  }

}
