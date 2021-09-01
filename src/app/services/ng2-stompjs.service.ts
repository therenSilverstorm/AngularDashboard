import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root'
})
export class Ng2StompjsService  {

  // Stream of messages
  private subscription: Subscription;
  public messages: Observable<Message>;

  // Subscription status
  public subscribed: boolean;

  // Array of historic message (bodies)
  public mq: Array<string> = [];

  // A count of messages received
  public count = 0;


  constructor(private _stompService: StompService, private dataShare: DataShareService, private statusStore : Store<State>) {
    // this.disconnected$.subscribe(() => {
    //   this.dataShare.shareData(StatusEnum.OFFLINE)
    // });
  }

  sendMessage(dashboard : DashboardModel) {
    this._stompService.publish('/app/hello', JSON.stringify(dashboard));
  }


  ngOnInit(): void {
    this.subscribed = false



    //CHANGE
    //this.subscribe();


  }


  public subscribe(dashboard: DashboardModel) {
    if (this.subscribed) {
      return;
    }

    this._stompService.connected$.subscribe(() => {
      this.dataShare.shareData(StatusEnum.ONLINE)
      this.statusStore.dispatch(new connected())
      this.sendMessage(dashboard)
    })

    // Stream of messages
    this.messages = this._stompService.subscribe('/topic/hi');

    // Subscribe a function to be run on_next message
    this.subscription = this.messages.subscribe(this.on_next);


    //CHANGE
     //this.dataShare.shareData(StatusEnum.ONLINE)
    // this.sendMessage(dashboard)

    this.subscribed = true;

  }


  public unsubscribe(dashboard: DashboardModel) {
    if (!this.subscribed) {
      return;
    }

    //CHANGE
    this.dataShare.shareData(StatusEnum.OFFLINE)
    this.statusStore.dispatch(new disconnected())
    this.sendMessage(dashboard)


    // This will internally unsubscribe from Stomp Broker
    // There are two subscriptions - one created explicitly, the other created in the template by use of 'async'
    this.subscription.unsubscribe();
    this.subscription = null;
    this.messages = null;

    this.subscribed = false;
    //this.dataShare.shareData(this.subscribed);
  }


  /** Consume a message from the _stompService */
  public on_next = (message: Message) => {

    // Store message in "historic messages" queue
    this.mq.push(message.body + '\n');

    // Count it
    this.count++;

    // Log it to the console
    console.log(JSON.parse(message.body));



  }


   public disconnected$ = this._stompService.connectionState$.pipe(
    filter((currentState: RxStompState) => {
      return currentState === RxStompState.CLOSED;
    })
  );


  //CHANGE
  // @HostListener('window:beforeunload', ['$event'])
  // async onBeforeUnload(): Promise<void> {
  //    this.unsubscribe();
  // }


}
