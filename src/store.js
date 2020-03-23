import {createStore ,applyMiddleware } from 'redux';
import reduces from "./Reducers"
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reduces , applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
export default store