import React, { useState, useEffect } from "react";
import { createQuestion, editQuestion } from "../redux/actions";
import { connect } from "react-redux";
import { useAuth0 } from "../auth0";
const SaveQuestion = ({
  q_id = null,
  survey,
  validator,
  question,
  editQuestion,
  createQuestion,
  setRerender
}) => {
  const { userAccessToken, hasAccessToRessource } = useAuth0();
  const [nextQuestionID, setNextQuestionID] = useState(null);

  const onClickSaveQuestion = action => {
    if (validator.allValid() && hasAccessToRessource(survey.owner)) {
      validator.hideMessages();
      action();
    } else {
      validator.showMessages();
      setRerender();
      return false;
    }
  };
  const RenderButton = ({ message, backToSurvey = false }) => {
    const action = q_id
      ? () =>
          editQuestion(
            survey._id,
            q_id,
            question,
            backToSurvey ? null : nextQuestionID,
            userAccessToken
          )
      : () =>
          createQuestion(
            survey._id,
            question,
            backToSurvey ? false : true,
            userAccessToken
          );
    return (
      <button
        className={`btn btn-${backToSurvey ? "secondary" : "primary"} m-1`}
        onClick={() => {
          onClickSaveQuestion(action);
        }}
      >
        {message}
      </button>
    );
  };
  useEffect(() => {
    if (survey && q_id) {
      let searchNextQuestionID = null;
      survey.questions.forEach((question, index, array) => {
        if (question._id === q_id) {
          if (array[index + 1]) {
            searchNextQuestionID = array[index + 1]._id;
          }
        }
      });
      setNextQuestionID(searchNextQuestionID);
    }
  }, [q_id, survey]);
  if (q_id) {
    return (
      <>
        <RenderButton
          backToSurvey
          message={"Save question and go back to survey"}
        />
        {nextQuestionID ? (
          <RenderButton message="Save question and edit next question" />
        ) : null}
      </>
    );
  } else {
    return (
      <>
        <RenderButton backToSurvey message={"Save question and end creation"} />

        <RenderButton message="Save question and create another one" />
      </>
    );
  }
};

export default connect(null, { createQuestion, editQuestion })(SaveQuestion);
