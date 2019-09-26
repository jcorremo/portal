import { ActionReducerMap } from '@ngrx/store';
import * as appStore from './state';

export interface AppState {
  app: appStore.State
}

export const initialState: AppState = {
  app: appStore.initialState
}

export const reducers: ActionReducerMap<AppState> = {
  app: appStore.reducer
}

export const getJSONData = (s: AppState) => s.app;