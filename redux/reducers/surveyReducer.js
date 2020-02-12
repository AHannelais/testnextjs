import _ from "lodash";
import {
  CREATE_SURVEY,
  EDIT_SURVEY,
  DELETE_SURVEY,
  FETCH_SURVEY,
  FETCH_SURVEYS,
  CREATE_QUESTION,
  EDIT_QUESTION,
  DELETE_QUESTION
} from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SURVEY:
      return { ...state, [action.payload._id]: action.payload };
    case CREATE_SURVEY:
      return {
        ...state,
        [action.payload.createdSurvey._id]: action.payload.createdSurvey
      };
    case EDIT_SURVEY:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_SURVEYS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case DELETE_SURVEY:
      return _.omit(state, action.payload);
    case CREATE_QUESTION:
      let survey_id = action.payload.survey_id;
      return {
        ...state,
        [survey_id]: {
          ...state[survey_id],
          questions: state[survey_id].questions.concat(
            action.payload.createdQuestion
          )
        }
      };
    case EDIT_QUESTION:
      const edit_survey_id = action.payload.survey_id;
      return {
        ...state,
        [edit_survey_id]: {
          ...state[edit_survey_id],
          questions: state[edit_survey_id].questions.filter(question => {
            return question._id != action.payload.q_id;
          })
        }
      };
    case DELETE_QUESTION:
      const delete_survey_id = action.payload.survey_id;
      return {
        ...state,
        [delete_survey_id]: {
          ...state[delete_survey_id],
          questions: state[delete_survey_id].questions.omit(question => {
            if (question._id === action.payload.editedQuestion._id) {
              return action.payload.editedQuestion;
            } else return question;
          })
        }
      };
    default:
      return state;
  }
};
