import {createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {DashboardModel} from "../../models/dashboard-model";
import * as ClientActions from "./clients.actions"



export interface State extends EntityState<DashboardModel>{}

export const adapter: EntityAdapter<DashboardModel> = createEntityAdapter<DashboardModel>({});

export const initialState: State = adapter.getInitialState ({});

export const clientReducer = createReducer(
  initialState,
  on(ClientActions.setUsers,(state,{clients}) => {
    return adapter.setAll(clients, state);
  }),
)

export const clientSelectors = adapter.getSelectors((s: any) => s.clients);


