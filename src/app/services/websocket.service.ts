import {Injectable, OnDestroy} from '@angular/core';
import {DashboardModel} from "../models/dashboard-model";
import {StatusEnum} from "../models/status-enum";
import {DataShareService} from "./data-share.service";
import {Message, Stomp} from "@stomp/stompjs";
import * as SockJS from 'sockjs-client';
import {select, Store} from '@ngrx/store';
import {TestListComponent} from "../test/test-list/test-list.component";


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {


  // greetings: string[] = [];
  // disabled = true
  // private stompClient = null;
  //
  // constructor(private dataShare: DataShareService) {
  //
  //
  // }
  //
  // ngOnDestroy(): void {
  //      this.stompClient.disconnect()
  //
  //   }
  //
  //
  //
  //
  // connect(dashboard : DashboardModel) {
  //   const socket = new SockJS('http://localhost:8080//gkz-stomp-endpoint');
  //   this.stompClient = Stomp.over(socket);
  //   //DEBUG = FALSE
  //   this.stompClient.debug = () => {}
  //
  //   const _this = this;
  //   this.stompClient.connect({}, function (frame) {
  //     _this.setConnected(true);
  //
  //     console.log('Connected: ' + frame);
  //     // _this.stompClient.subscribe('/topic/hi', function (hello) {
  //     //
  //     // });
  //     _this.dataShare.shareData(StatusEnum.ONLINE)
  //     _this.sendClient(dashboard) //Getting list of users here
  //   });
  //
  //
  // }
  //
  // setConnected(connected: boolean) {
  //   this.disabled = !connected;
  //   if (connected) {
  //     this.greetings = [];
  //   }
  // }
  //
  // showGreeting(message) {
  //   console.log(message)
  // }
  //
  //
  //
  // disconnect(dashboard : DashboardModel) {
  //   this.dataShare.shareData(StatusEnum.OFFLINE)
  //
  //   if (this.stompClient != null) {
  //     this.sendClient(dashboard)
  //     this.stompClient.disconnect();
  //   }
  //
  //   this.setConnected(false);
  //   // this.dataShare.shareData(StatusEnum.OFFLINE)
  //   console.log('Disconnected!');
  // }
  //
  // sendClient(dashboard : DashboardModel) {
  //   this.stompClient.send(
  //     '/app/hello',
  //     {},
  //     JSON.stringify(dashboard)
  //   );
  // }


}

