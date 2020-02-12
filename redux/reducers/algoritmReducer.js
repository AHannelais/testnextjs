import _ from "lodash";
import { CREATE_ALGORITHM, FETCH_ALGORITHMS } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_ALGORITHM:
      return {
        ...state,
        [action.payload.createdAlgorithm._id]: action.payload.createdAlgorithm
      };

    case FETCH_ALGORITHMS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };

    default:
      return state;
  }
};
