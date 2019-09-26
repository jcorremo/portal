import { GET_JSON_DATA } from './app.actions';
import * as programActions from './app.actions'

export function reducer(state: any, action: programActions.AppAction): any {
  switch (action.type) {
    case GET_JSON_DATA: {
      console.log('Reducer ' + GET_JSON_DATA)
      console.log(action)
      return {
        theme: '',
        title: '',
        logo: ''
      }
    }
    default: {
      return {
        ...state
      }
    };
  }
}