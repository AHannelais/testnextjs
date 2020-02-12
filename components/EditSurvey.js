import React, { useState, useEffect } from "react";
import { fetchSurvey } from "../redux/actions";
import { connect } from "react-redux";
import Link from "next/link";
import { useAuth0 } from "../utils/auth0";

const EditSurvey = function(props) {
  const { hasAccessToRessource } = useAuth0();
  const doFetchSurvey = async () => {
    try {
      await props.fetchSurvey(props.survey_id);
    } catch (err) {
      throw new Error(err);
    }
  };
  useEffect(() => {
    doFetchSurvey();
  }, []);

  const renderCreateQuestionButton = function() {
    if (hasAccessToRessource(props.survey.owner))
      return (
        <Link href={`/survey/${props.survey_id}/new_question`}>
          <a className="btn btn-primary m-1"> Create New Question</a>
        </Link>
      );
  };
  const renderEditQuestionButton = function() {
    if (
      props.survey.questions &&
      props.survey.questions.length !== 0 &&
      hasAccessToRessource(props.survey.owner)
    )
      return (
        <Link
          href={`/survey/${props.survey_id}/edit/${props.survey.questions[0]._id}`}
        >
          <a className="btn btn-secondary m-1">Edit Questions</a>
        </Link>
      );
  };
  const renderReadQuestionButton = function() {
    if (props.survey.questions && props.survey.questions.length !== 0)
      return (
        <Link
          href={`/survey/${props.survey_id}/${props.survey.questions[0]._id}`}
        >
          <a className="btn btn-secondary m-1">Read Questions</a>
        </Link>
      );
  };
  console.log(props);

  if (props.survey) {
    return (
      <div className="container">
        <p className="font-weight-bold">
          {props.survey.name} by {props.survey.owner.userName}
        </p>
        {renderCreateQuestionButton()}
        {renderEditQuestionButton()}
        {renderReadQuestionButton()}
        <Link href="/">
          <a className="btn btn-warning m-1">Back to HomePage</a>
        </Link>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
const mapStateToProps = (state, onwProps) => {
  return {
    survey: state.surveys[onwProps.survey_id]
  };
};

export default connect(mapStateToProps, { fetchSurvey })(EditSurvey);
