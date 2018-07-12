import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import urlApp from './Reducers';

export const store = createStore(
  urlApp,
  applyMiddleware(
    thunkMiddleware
  )
);