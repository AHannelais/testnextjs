import { FETCH_ALGORITHMS, CREATE_ALGORITHM } from "./types";
import algorithms from "../../apis/surveys";

const config = function(userAccessToken) {
  return {
    headers: {
      Authorization: `Bearer ${userAccessToken}`
    }
  };
};

export const createAlgorithm = (content, userAccessToken) => async dispatch => {
  console.log("try to create");
  const response = await algorithms.post(
    "/algorithms",
    content,
    config(userAccessToken)
  );
  dispatch({ type: CREATE_ALGORITHM, payload: response.data });
  console.log(response.data);
};
export const fetchAlgorithms = userAccessToken => async dispatch => {
  const response = await algorithms.get("/algorithms", config(userAccessToken));
  console.log(response.data);
  dispatch({ type: FETCH_ALGORITHMS, payload: response.data });
};
