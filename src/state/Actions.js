import { AsyncStorage } from 'react-native';
import {
  ADD_URL,
  REMOVE_URL,
  LOAD_URLS,
  LOAD_FROM_ASYNCSTORAGE
} from './Types';

/*
 * action creators
 */

export function addUrl(key, url) {
  return { type: ADD_URL, key, url };
}

export function removeUrl(key) {
  return { type: REMOVE_URL, key };
}

export function loadUrls(urls) {
  return { type: LOAD_URLS, urls };
}

export function saveOnAsyncStorage(key, url) {
  return dispatch => {
    return AsyncStorage.setItem(key, url).then(
      () => dispatch(addUrl(key, url)),
      error => console.log("AsyncStore save error.", error)
    );
  }
}

export function removeFromAsyncStorage(key) {
  return dispatch => {
    return AsyncStorage.removeItem(`${key}`).then(
      () => dispatch(removeUrl(key)),
      error => console.log("AsyncStore save error.", error)
    );
  };
}

export function loadFromAsyncStorage() {
  return dispatch => {
    return AsyncStorage.getAllKeys().then(keys => {
      return AsyncStorage.multiGet(keys);
    }).then(
      urls => dispatch(loadUrls(urls)),
      error => console.log("AsyncStore save error.", error)
    );
  }
}