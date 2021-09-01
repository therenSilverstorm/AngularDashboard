import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';

import * as fromClient from "../clients/reducer/clients.reducer"

export interface State {
  clients: fromClient.State;
}

export const reducers: ActionReducerMap<State> = {
  clients : fromClient.reducer,
};

export const selectClientState = createFeatureSelector<fromClient.State>('clients');


export const selectAllClients = createSelector(
  selectClientState,
  fromClient.selectAllClients
);
