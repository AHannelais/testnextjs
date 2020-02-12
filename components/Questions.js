import React, { useState /*useState, useEffect*/, useEffect } from "react";
import { connect } from "react-redux";
import { createQuestion, editQuestion } from "../redux/actions";
import { Link } from "react-router-dom";
import QuestionForm from "./QuestionForm";
import SimpleReactValidator from "simple-react-validator";
import SaveQuestion from "./SaveQuestion";
let validator = new SimpleReactValidator();

function Questions(props) {
  const [question, setQuestion] = useState(
    props.survey &&
      props.survey.questions.find(q => q._id === props.match.params.q_id)
      ? props.survey.questions.find(q => q._id === props.match.params.q_id)
      : {
          questionName: "",
          questionRef: "",
          questionFiles: []
        }
  );
  const [rerender, setRerender] = useState(0);
  useEffect(() => {
    validator.hideMessages();
    if (props.location.pathname.includes("new_question") && props.survey) {
      setQuestion({
        questionFiles: new Array(props.survey.algorithms.length).fill({
          name: null,
          file: null,
          url: null
        })
      });
    }
    if (props.location.state === "refresh" && props.survey) {
      console.log("refresh");
      setQuestion(
        props.survey &&
          props.survey.questions.find(q => q._id === props.match.params.q_id)
          ? props.survey.questions.find(q => q._id === props.match.params.q_id)
          : {
              questionName: "",
              questionRef: "",
              questionFiles: new Array(props.survey.algos.length).fill(0)
            }
      );
    }
  }, [
    props.location.pathname,
    props.survey,
    props.location.state,
    props.match.params.q_id
  ]);

  const onChangeQuestionName = e => {
    e.preventDefault();

    setQuestion({ ...question, questionName: e.target.value });
  };
  const onChangeQuestionRef = e => {
    e.preventDefault();
    if (e.target.files.length !== 0) {
      setQuestion({
        ...question,
        questionRef: {
          name: e.target.files[0].name,
          file: e.target.files[0],
          url: URL.createObjectURL(e.target.files[0])
        }
      });
    }
  };
  const onChangeQuestionFile = (indexFileToChange, e) => {
    e.preventDefault();
    e.persist();
    setQuestion(state => {
      const questionFiles = question.questionFiles.map((file, indexFile) => {
        if (indexFile === indexFileToChange) {
          if (e.target.files) {
            return {
              name: e.target.files[0].name,
              file: e.target.files[0],
              url: URL.createObjectURL(e.target.files[0]),
              algo_id: props.survey.algorithms[indexFile]._id
            };
          } else {
            return file;
          }
        }
        return file;
      });
      return { ...question, questionFiles };
    });
  };

  if (!props.survey) {
    return (
      <Link to={`/survey/${props.match.params.id}`}>Go back to survey</Link>
    );
  }
  return (
    <>
      <QuestionForm
        onChangeQuestionName={onChangeQuestionName}
        onChangeQuestionRef={onChangeQuestionRef}
        onChangeQuestionFile={onChangeQuestionFile}
        {...question}
        algorithms={props.survey.algorithms}
        validator={validator}
      />
      <SaveQuestion
        survey={props.survey}
        validator={validator}
        q_id={props.match.params.q_id}
        question={question}
        setRerender={() => {
          setRerender(rerender + 1);
        }}
      />
    </>
  );
}
const mapStateToProps = (state, onwProps) => {
  return {
    survey: state.surveys[onwProps.match.params.id]
  };
};
export default connect(mapStateToProps, { createQuestion, editQuestion })(
  Questions
);
