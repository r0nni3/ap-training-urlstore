import { createStore } from 'redux';
import urlApp from './Reducers';

export const store = createStore(urlApp);