/**
 * Reducers
 */

import { combineReducers } from 'redux';
import { ADD_URL, REMOVE_URL, LOAD_FROM_ASYNCSTORAGE } from './Types';

function urls(state = [], action) {
  switch(action.type) {
    case ADD_URL:
      return [
        ... state,
        { key: action.key, link: action.url }
      ];
    case REMOVE_URL:
      return state.filter( url => url.key !== action.key);
    case LOAD_FROM_ASYNCSTORAGE:
      return [... state, ... action.urls.map(([key, link]) => {
        return {key, link};
      })];
    default:
      return state;
  }
}

/*
export function urlApp(state = initialState, action) {
  return {
    urls: urls(state.urls, action)
  };
}
// This commented block, is the same thing as bellow.
// key and state key must match.
*/
const urlApp = combineReducers({
  urls
});

export default urlApp;