import { createSelector, createFeatureSelector } from '@ngrx/store';
import {State} from "../status/status.reducer"




export const getStatusState = createFeatureSelector<State>('status');

export const getStatus = createSelector(
  getStatusState,
  (state : State) => state.status
);

