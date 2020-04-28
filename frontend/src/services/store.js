import Reducer from './reducer';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(Reducer, applyMiddleware(sagaMiddleware));

export default store;
