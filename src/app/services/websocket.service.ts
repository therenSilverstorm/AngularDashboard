import {Injectable} from '@angular/core';
import {DashboardModel} from "../models/dashboard-model";
import {webSocket} from "rxjs/webSocket";
import {StatusEnum} from "../models/status-enum";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() {

  }

  getSubject(dashboard: DashboardModel) {
    const queryParams = `?X-Forwarded-For=${dashboard.ip}&User-Agent=${dashboard.browser}`
    const webSocketUrl = environment.web_socket_server + queryParams;
    return webSocket({
      url: webSocketUrl,
      closeObserver: {
        next(closeEvent) {
          console.log(closeEvent.reason)
          dashboard.status = StatusEnum.OFFLINE
        }
      },
      openObserver: {
        next: () => {
          dashboard.status = StatusEnum.ONLINE
        }
      }
    })

  }


}

