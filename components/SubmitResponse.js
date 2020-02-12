import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createResponse } from "../redux/actions";
import { useAudioManagement } from "./AudioManagement";
import { useCookies } from "react-cookie";
import uniqid from "uniqid";
import _ from "lodash";
import { useAuth0 } from "../auth0";
import history from "../history";

function SubmitResponse(props) {
  const { onStopPlayer } = useAudioManagement();
  const { cookies, setCookie } = useCookies();
  const { user } = useAuth0();
  const QuestionValidation = () => {
    if (props.validator.allValid()) {
      return true;
    } else {
      props.validator.showMessages();
      props.setrerender(props.rerender + 1);
      return false;
    }
  };

  const onClickValidateResponse = async function() {
    const valid = QuestionValidation();
    if (valid) {
      let userID;
      if (user) {
        userID = user.sub;
      } else if (cookies.userID) {
        userID = cookies.userID;
      } else {
        setCookie("userID", uniqid(), { sameSite: true, maxAge: 6000 });
        userID = cookies.userID;
      }
      onStopPlayer();
      const completed = await props.createResponse(
        props.survey_id,
        {
          answer: props.sortResponses(),
          userId: userID,
          survey_id: props.survey_id,
          question_id: props.question_id
        },
        props.nextQuestionID
      );
      if (completed) {
        setCookie(
          "completedSurveys",
          cookies.completedSurvey
            ? cookies.completedSurvey.concat(props.survey_id)
            : [props.survey_id]
        );
        history.push("/");
      }
    }
  };
  const SubmitResponseButton = () => {
    const message = props.nextQuestionID ? "Next Question" : "Complete Survey";
    return (
      <button
        className="btn btn-primary m-1"
        onClick={() => onClickValidateResponse()}
      >
        {message}
      </button>
    );
  };

  return (
    <div>
      <SubmitResponseButton />
      <Link
        className="btn btn-warning m-1"
        to={`/survey/${props.survey_id}`}
        onClick={() => onStopPlayer()}
      >
        Stop Survey
      </Link>
    </div>
  );
}

export default connect(null, { createResponse })(SubmitResponse);
