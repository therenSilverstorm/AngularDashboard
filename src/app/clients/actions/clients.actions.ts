import {Action, createAction, props} from '@ngrx/store';
import {DashboardModel} from "../../models/dashboard-model";

export const setUsers = createAction('Set clients', props<{clients: DashboardModel[]}>());

