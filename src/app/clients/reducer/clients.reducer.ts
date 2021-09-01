import { Action, createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {DashboardModel} from "../../models/dashboard-model";
import * as ClientActions from "../actions/clients.actions"


export const clientsFeatureKey = 'clients';

export interface State extends EntityState<DashboardModel>{}

export const adapter: EntityAdapter<DashboardModel> = createEntityAdapter<DashboardModel>({});

export const initialState: State = adapter.getInitialState ({});

const userReducer = createReducer(initialState);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}


export const clientReducer = createReducer(
  initialState,
  on(ClientActions.setUsers,(state,{clients}) => {
    return adapter.setAll(clients, state);
  }),
)

export const clientSelectors = adapter.getSelectors((s: any) => s.clients);

const {
  selectAll
} = adapter.getSelectors();

//select the array of clients
export const selectAllClients = selectAll;

