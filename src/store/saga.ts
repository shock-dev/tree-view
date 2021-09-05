import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { RootActionTypes } from './types';
import BranchApi from '../api/branch';
import { deleteBranchSuccess, fetchBranchesSuccess, updateBranchSuccess } from './actions';

function* fetchBranches(): SagaIterator {
  try {
    const items = yield call(BranchApi.all);
    yield put(fetchBranchesSuccess(items));
  } catch (e) {
    console.log(e);
  }
}

function* updateBranch(action: any): SagaIterator {
  try {
    const { old, value } = action.payload;
    const prepareItem = { ...old, title: value };
    const updated = yield call(BranchApi.update, old._id, prepareItem);
    yield put(updateBranchSuccess(updated._id, value));
  } catch (e) {
    console.log(e);
  }
}

function* deleteBranch(action: any): SagaIterator {
  try {
    const id = action.payload;
    yield call(BranchApi.delete, id);
    yield put(deleteBranchSuccess(id));
  } catch (e) {
    console.log(e);
  }
}

function* saga() {
  yield takeLatest(RootActionTypes.FETCH_BRANCHES_REQUEST, fetchBranches);
  yield takeLatest(RootActionTypes.UPDATE_BRANCH_REQUEST, updateBranch);
  yield takeLatest(RootActionTypes.DELETE_BRANCH_REQUEST, deleteBranch);
}

export default saga;
