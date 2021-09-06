import produce from 'immer';
import { RootActionTypes, RootState, Status } from './types';
import { IBranch } from '../types/branch';

const state: RootState = {
  items: [],
  status: Status.NEVER
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case RootActionTypes.FETCH_BRANCHES_REQUEST:
      draft.status = Status.GETTING;
      break;

    case RootActionTypes.FETCH_BRANCHES_SUCCESS:
      draft.items = action.payload;
      draft.status = Status.DONE;
      break;

    case RootActionTypes.CREATE_BRANCH_REQUEST:
      draft.error = undefined;
      draft.status = Status.CREATING;
      break;

    case RootActionTypes.CREATE_BRANCH_SUCCESS: {
      draft.items.push(action.payload);
      draft.status = Status.DONE;
      break;
    }

    case RootActionTypes.UPDATE_BRANCH_REQUEST:
      draft.error = undefined;
      draft.status = Status.UPDATING;
      break;

    case RootActionTypes.UPDATE_BRANCH_SUCCESS: {
      const { id, value } = action.payload;
      const idx = draft.items.findIndex((b: IBranch) => b._id === id);
      draft.items[idx].title = value;
      draft.status = Status.DONE;
      break;
    }

    case RootActionTypes.DELETE_BRANCH_REQUEST:
      draft.error = undefined;
      draft.status = Status.DELETING;
      break;

    case RootActionTypes.DELETE_BRANCH_SUCCESS: {
      const id = action.payload;
      const idx = draft.items.findIndex((b: IBranch) => b._id === id);
      draft.items.splice(idx, 1);
      draft.status = Status.DONE;
      break;
    }

    case RootActionTypes.SET_ERROR:
      draft.error = action.payload;
      draft.status = Status.DONE;
      break;

    default:
      break;
  }
}, state);

export default reducer;
