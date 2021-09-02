
import {OnlineStatusActionTypes, StatusActions} from "./status.actions";


export interface State {
  status : boolean,
}

export const initialState: State = {
  status : false
};

export function reducer(state = initialState, action: StatusActions): State {
  switch (action.type) {
    case OnlineStatusActionTypes.connect: {
      return {
        status : true
      };
    }

    case OnlineStatusActionTypes.disconnect: {
      return {
        status : false
      };
    }

    default:
      return state;
  }
}




