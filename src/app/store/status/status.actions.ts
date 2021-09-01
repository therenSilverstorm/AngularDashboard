import {Action, createAction, props} from '@ngrx/store';


export enum OnlineStatusActionTypes {
  connect = '[CONNECT] Connection started',
  disconnect = '[DISCONNECT] Connection closed'
}

export class connected implements Action {
  readonly type = OnlineStatusActionTypes.connect;
}

export class disconnected implements Action {
  readonly type = OnlineStatusActionTypes.disconnect;
}

export type StatusActions = disconnected | connected;


