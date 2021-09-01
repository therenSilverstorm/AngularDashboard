import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Message, Stomp} from "@stomp/stompjs";
import {Observable, Subscription} from "rxjs";
import {DashboardModel} from "../../models/dashboard-model";
import * as actions from "../actions/clients.actions"
import {clientSelectors} from "../reducer/clients.reducer";
import {getStatus} from "../../store/status/index";
import {State} from "../../store/status/state";
import {StompService} from "@stomp/ng2-stompjs";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients$ = this.store.select(clientSelectors.selectAll);
  status$: Observable<boolean>;

  columnsToDisplay = ['id', 'ip', 'status']

  public messages: Observable<Message>;
  private subscription: Subscription;


  constructor(private store: Store, private statusStore: Store<State>, private _stompService: StompService) {
    this.check()
  }

  ngOnInit(): void {
    this.status$ = this.statusStore.pipe(select(getStatus))
  }


  check() {
    // Stream of messages
    this.messages = this._stompService.subscribe('/topic/hi');

    // Subscribe a function to be run on_next message
    this.subscription = this.messages.subscribe(this.on_next);


    //CHANGE
    //this.dataShare.shareData(StatusEnum.ONLINE)
    // this.sendMessage(dashboard)


  }

  on_next = (message: Message) => {
    let tempArr: DashboardModel[] = [];
    let inputMap = JSON.parse(message.body)
    Object.keys(inputMap).map(key => {
      let d: DashboardModel = inputMap[key]
      tempArr.push(d)
    })
    console.log(tempArr)

    this.store.dispatch(actions.setUsers(actions.setUsers({
      clients: tempArr
    })));

  }


}

