import {Component, HostListener, OnInit} from '@angular/core';
import {StompService} from "@stomp/ng2-stompjs";
import {Observable, Subscription} from "rxjs";
import {Message} from '@stomp/stompjs';
import {RxStompState} from '@stomp/rx-stomp'
import * as actions from "../../clients/actions/clients.actions"
import {reducer} from "../../clients/reducer/clients.reducer";
import {clientSelectors} from "../../clients/reducer/clients.reducer";
import {DataShareService} from "../../services/data-share.service";
import {Store} from "@ngrx/store";
import {StatusEnum} from "../../models/status-enum";
import {DashboardModel} from "../../models/dashboard-model";

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {
  // Stream of messages
  private subscription: Subscription;
  public messages: Observable<Message>;

  // Subscription status
  public subscribed: boolean;

  // Array of historic message (bodies)
  public mq: Array<string> = [];

  // A count of messages received
  public count = 0;


  constructor(private _stompService: StompService, private dataShare: DataShareService, private store: Store) {
  }

  sendMessage() {
    this._stompService.publish('/app/hello', 'My important message');
  }


  ngOnInit(): void {
    this.subscribed = false

    //CHANGE
    //this.subscribe();

    // this._stompService.connectionState$.subscribe(next => {
    //   console.log('Connection State', RxStompState[next]);
    //   if(next === RxStompState.CLOSING) {
    //     this.unsubscribe()
    //   }
    // });
  }


  public subscribe(dashboard: DashboardModel) {
    if (this.subscribed) {
      return;
    }

    // Stream of messages
    this.messages = this._stompService.subscribe('/topic/hi');

    // Subscribe a function to be run on_next message
    this.subscription = this.messages.subscribe(this.on_next);

    //CHANGE
    this.dataShare.shareData(StatusEnum.ONLINE)

    this.subscribed = true;

  }


  public unsubscribe(dashboard: DashboardModel) {
    if (!this.subscribed) {
      return;
    }

    //CHANGE
    this.dataShare.shareData(StatusEnum.OFFLINE)
    this.sendMessage()


    // This will internally unsubscribe from Stomp Broker
    // There are two subscriptions - one created explicitly, the other created in the template by use of 'async'
    this.subscription.unsubscribe();
    this.subscription = null;
    this.messages = null;

    this.subscribed = false;
  }


  /** Consume a message from the _stompService */
  public on_next = (message: Message) => {

    // Store message in "historic messages" queue
    this.mq.push(message.body + '\n');

    // Count it
    this.count++;

    // Log it to the console
    console.log(JSON.stringify(message.body));

    let tempArr: DashboardModel[] = [];
    let inputMap = JSON.parse(message.body)
    Object.keys(inputMap).map(key => {
      let d: DashboardModel = inputMap[key]
      tempArr.push(d)
    })
    this.store.dispatch(actions.setUsers(actions.setUsers({
      clients: tempArr
    })));


  }


  //CHANGE
  // @HostListener('window:beforeunload', ['$event'])
  // async onBeforeUnload(): Promise<void> {
  //    this.unsubscribe();
  // }

}
