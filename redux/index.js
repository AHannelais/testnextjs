import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk"; // redux thunk allow Promise in redux store
import reducers from "./reducers";

const store = createStore(reducers, applyMiddleware(reduxThunk));

export default store;
