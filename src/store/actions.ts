import { action } from 'typesafe-actions';
import { RootActionTypes } from './types';
import { IBranch } from '../types/branch';

export const fetchBranchesRequest = () => action(RootActionTypes.FETCH_BRANCHES_REQUEST);

export const fetchBranchesSuccess = (items: IBranch[]) => action(RootActionTypes.FETCH_BRANCHES_SUCCESS, items);

export const updateBranchRequest = (old: IBranch, value: string) => action(RootActionTypes.UPDATE_BRANCH_REQUEST, { old, value });

export const updateBranchSuccess = (id: IBranch['_id'], value: string) => action(RootActionTypes.UPDATE_BRANCH_SUCCESS, { id, value });

export const deleteBranchRequest = (id: IBranch['_id']) => action(RootActionTypes.DELETE_BRANCH_REQUEST, id);

export const deleteBranchSuccess = (id: IBranch['_id']) => action(RootActionTypes.DELETE_BRANCH_SUCCESS, id);

export const setError = (error: string) => action(RootActionTypes.SET_ERROR, error);
