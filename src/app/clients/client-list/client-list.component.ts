import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Message} from "@stomp/stompjs";
import {Observable, Subscription} from "rxjs";
import {DashboardModel} from "../../models/dashboard-model";
import * as actions from "../../store/clientsEntities/clients.actions"
import {clientSelectors} from "../../store/clientsEntities/clients.reducer";
import {getStatus} from "../../store/status";
import {State} from "../../store/status/state";
import {StompService} from "@stomp/ng2-stompjs";
import {environment} from "../../../environments/environment";

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
//Subscribes to WebSocket message topic
    this.messages = this._stompService.subscribe(environment.sendClientsTopic);

    this.subscription = this.messages.subscribe(this.on_next);

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

