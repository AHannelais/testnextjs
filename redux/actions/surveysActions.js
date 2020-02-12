import Router from "next/router";
import {
  CREATE_SURVEY,
  DELETE_SURVEY,
  EDIT_SURVEY,
  FETCH_SURVEYS,
  FETCH_SURVEY
} from "./types";
import surveys from "../../apis/surveys";
import { downloadFiles } from "../../apis/audioFiles";

const config = function(userAccessToken) {
  return {
    headers: {
      Authorization: `Bearer ${userAccessToken}`
    }
  };
};

export const createSurvey = (content, userAccessToken) => async dispatch => {
  const response = await surveys.post(
    "/surveys",
    content,
    config(userAccessToken)
  );
  dispatch({ type: CREATE_SURVEY, payload: response.data });
  console.log(response.data);
  Router.push(`/survey/${response.data.createdSurvey._id}`);
};
export const fetchSurveys = () => async dispatch => {
  try {
    const response = await surveys.get("/surveys");
    dispatch({ type: FETCH_SURVEYS, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};
export const fetchSurvey = id => async dispatch => {
  let response;
  try {
    response = await surveys.get(`/surveys/${id}`);
  } catch (err) {
    throw new Error(err);
  }

  const downloadQuestionFiles = async question => {
    try {
      const response = await downloadFiles(
        id,
        question.questionRef,
        question.questionFiles
      );
      question.questionRef = response.questionRef;
      question.questionFiles = response.questionFiles;
    } catch (err) {
      throw new Error(err);
    }
  };
  const questions = response.data.questions;
  await Promise.all(
    questions.map(async question => {
      await downloadQuestionFiles(question);
    })
  );

  response.data.questions = questions;
  dispatch({ type: FETCH_SURVEY, payload: response.data });
};

export const editSurvey = (id, content) => async dispatch => {
  const response = await surveys.patch(`/surveys/${id}`, content);
  dispatch({ type: EDIT_SURVEY, payload: response.data });
  Router.push("/home");
};
export const deleteSurvey = id => async dispatch => {
  await surveys.delete(`/surveys/${id}`);
  dispatch({ type: DELETE_SURVEY, payload: id });
};
