import { createStore } from 'easy-peasy';
import { Middleware } from 'redux';
import logger from 'redux-logger';
import { storeModel } from './models';

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(storeModel, {
  middleware: middlewares,
});
