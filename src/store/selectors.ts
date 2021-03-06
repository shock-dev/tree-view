import { RootState } from './types';

export const selectBranches = (state: RootState) => state.items;

export const selectStatus = (state: RootState) => state.status;

export const selectError = (state: RootState) => state.error;
