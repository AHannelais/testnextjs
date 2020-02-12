import Router from "next/router";
import { CREATE_QUESTION, EDIT_QUESTION, DELETE_QUESTION } from "./types";
import surveys from "../../apis/surveys";
import { uploadFiles } from "../../apis/audioFiles";

const config = function(userAccessToken) {
  return {
    headers: {
      Authorization: `Bearer ${userAccessToken}`
    }
  };
};

export const createQuestion = (
  id,
  content,
  createAnotherQuestion,
  userAccessToken
) => async dispatch => {
  try {
    await uploadFiles(
      id,
      content.questionRef,
      content.questionFiles,
      config(userAccessToken)
    );
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
  content.questionRef = content.questionRef.name;

  const response = await surveys.post(
    `/surveys/${id}`,
    content,
    config(userAccessToken)
  );
  dispatch({
    type: CREATE_QUESTION,
    payload: { survey_id: id, ...response.data }
  });
  console.log(response.data);
  if (createAnotherQuestion) {
    Router.push(`/survey/${id}/new_question`, "refresh");
  } else {
    Router.push(`/`);
  }
};
export const editQuestion = (
  id,
  q_id,
  content,
  next_q_id,
  userAccessToken
) => async dispatch => {
  try {
    await uploadFiles(
      id,
      content.questionRef,
      content.questionFiles,
      config(userAccessToken)
    );
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
  content.questionRef = content.questionRef.name;

  const response = await surveys.patch(
    `/surveys/${id}/${q_id}`,
    content,
    config(userAccessToken)
  );
  console.log("edit response", response.data);
  dispatch({
    type: EDIT_QUESTION,
    payload: { survey_id: id, ...response.data }
  });

  if (next_q_id) {
    Router.push(`/survey/${id}/edit/${next_q_id}`, "refresh");
  } else {
    Router.push(`/survey/${id}`);
  }
};
export const deleteQuestion = (id, q_id) => async dispatch => {
  await surveys.delete(`/surveys/${id}/${q_id}`);
  dispatch({ type: DELETE_QUESTION, payload: { survey_id: id, q_id: q_id } });
};
