import { ADD_URL, REMOVE_URL, LOAD_FROM_ASYNCSTORAGE } from './Types';

/*
 * action creators
 */

export function addUrl(key, url) {
  return { type: ADD_URL, key, url };
}

export function removeUrl(key) {
  return { type: REMOVE_URL, key };
}

export function loadFromAsyncStorage(urls) {
  return { type: LOAD_FROM_ASYNCSTORAGE, urls };
}