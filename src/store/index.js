import Reactotron from "../config/ReactotronConfig";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./ducks";
import sagas from "./sagas";

const sagaMonitor = __DEV__ ? Reactotron.createSagaMonitor() : null;

const sagaMiddleWare = createSagaMiddleware({ sagaMonitor });

const buildStore = __DEV__ ? Reactotron.createStore : createStore;

const store = buildStore(reducers, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(sagas);

export default store;
