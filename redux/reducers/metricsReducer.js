import { FECTCH_METRICS_BY_SURVEY } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case FECTCH_METRICS_BY_SURVEY:
      return { ...state, [action.payload.survey_id]: action.payload };

    default:
      return state;
  }
};
