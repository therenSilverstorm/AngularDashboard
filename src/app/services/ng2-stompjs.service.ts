import {Injectable} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Message} from "@stomp/stompjs";
import {StompService} from "@stomp/ng2-stompjs";
import {DataShareService} from "./data-share.service";
import {DashboardModel} from "../models/dashboard-model";
import {StatusEnum} from "../models/status-enum";
import {RxStompState} from "@stomp/rx-stomp";
import {filter} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {State} from "../store/status/state";
import {connected, disconnected} from "../store/status/status.actions";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class Ng2StompjsService {

  // Stream of messages
  private subscription: Subscription;
  public messages: Observable<Message>;

  // Subscription status
  public subscribed: boolean;


  constructor(private _stompService: StompService, private dataShare: DataShareService, private statusStore: Store<State>) {
  }

  sendMessage(dashboard: DashboardModel) {
    this._stompService.publish('/app/getClients', JSON.stringify(dashboard));
  }


  public subscribe(dashboard: DashboardModel) {
    if (this.subscribed) {
      return;
    }

    //Runs after the connection establishes
    this._stompService.connected$.subscribe(() => {
      this.dataShare.shareData(StatusEnum.ONLINE)
      this.statusStore.dispatch(new connected())
      this.sendMessage(dashboard)
    })

    // Stream of messages
    //Subscribes to WebSocket message topic
    this.messages = this._stompService.subscribe(environment.sendClientsTopic);

    this.subscribed = true;
  }


  public unsubscribe(dashboard: DashboardModel) {
    if (!this.subscribed) {
      return;
    }
    //Runs after the disconnection
    this.dataShare.shareData(StatusEnum.OFFLINE)
    this.statusStore.dispatch(new disconnected())
    this.sendMessage(dashboard)


    // This will internally unsubscribe from Stomp Broker
    // There are two subscriptions - one created explicitly, the other created in the template by use of 'async'
    //this.subscription.unsubscribe();
    this.subscription = null;
    this.messages = null;

    this.subscribed = false;
  }


  public disconnected$ = this._stompService.connectionState$.pipe(
    filter((currentState: RxStompState) => {
      return currentState === RxStompState.CLOSED;
    })
  );


}
