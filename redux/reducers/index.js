import { combineReducers } from "redux";
import surveyReducer from "./surveyReducer";
import algoReducer from "./algoritmReducer";
import metricsReducer from "./metricsReducer";
export default combineReducers({
  surveys: surveyReducer,
  algorithms: algoReducer,
  metrics: metricsReducer
});
