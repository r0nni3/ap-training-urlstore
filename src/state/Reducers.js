/**
 * Reducers
 */

import { combineReducers } from 'redux';
import { ADD_URL, REMOVE_URL, UPDATE_URL, LOAD_URLS } from './Types';

function urls(state = [], action) {
  switch(action.type) {
    case ADD_URL:
      return [
        ... state,
        { key: action.key, link: action.url }
      ];
    case REMOVE_URL:
      return state.filter( url => url.key !== action.key);
    case UPDATE_URL:
      return state.map( url => {
        if (url.key === action.key) return {key: action.key, link: action.url};
        return url;
      });
    case LOAD_URLS:
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