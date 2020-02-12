import Router from "next/router";
import {
  CREATE_RESPONSE,
  FECTCH_METRICS_BY_SURVEY,
  UPDATE_METRICS_BY_SURVEY
} from "./types";
import surveys from "../../apis/surveys";
const config = function(userAccessToken) {
  return {
    headers: {
      Authorization: `Bearer ${userAccessToken}`
    }
  };
};

export const createResponse = (id, content, next_q_id) => async dispatch => {
  const response = await surveys.post(`/responses`, content);
  dispatch({ type: CREATE_RESPONSE, payload: response.data.createdResponse });
  if (next_q_id) {
    Router.push(`/survey/${id}/${next_q_id}`, "refresh");
  } else {
    try {
      await surveys.put("/responses");
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
    return true;
  }
};

export const fetchMetricsBySurvey = (id, userAccessToken) => async dispatch => {
  const response = await surveys.get(`/metrics/${id}`, config(userAccessToken));
  console.log("response", response.data);
  dispatch({
    type: FECTCH_METRICS_BY_SURVEY,
    payload: response.data
  });
  return response.data;
};

export const updateMetricsBySurvey = (
  id,
  userAccessToken
) => async dispatch => {
  const response = await surveys.put(
    `/metrics/${id}`,
    null,
    config(userAccessToken)
  );
  console.log("response", response.data);
  dispatch({
    type: UPDATE_METRICS_BY_SURVEY
  });
};
