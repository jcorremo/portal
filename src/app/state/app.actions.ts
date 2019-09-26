import { Action } from '@ngrx/store';

export const GET_JSON_DATA = "Get JSON Data"

export class GetJSONData implements Action {
  readonly type: string = GET_JSON_DATA

  constructor(public payload: any) {
    console.log('ACTION ' + GET_JSON_DATA)
  }
}

export type AppAction = GetJSONData;