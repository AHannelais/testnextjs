import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import QuestionMarkInput from "./QuestionMarkInput";
import { createResponse } from "../redux/actions";
import SimpleReactValidator from "simple-react-validator";
import { useAudioManagement } from "./AudioManagement";
import SubmitResponse from "./SubmitResponse";
import Audio from "./Audio";
import _ from "lodash";

let validator = new SimpleReactValidator();

function ReadQuestion(props) {
  const { onStopPlayer } = useAudioManagement();
  const [question, setQuestion] = useState(
    props.survey
      ? props.survey.questions.find(
          question => question._id === props.match.params.q_id
        )
      : null
  );
  const [responses, setResponses] = useState(
    props.survey
      ? _.shuffle(
          props.survey.algorithms.map(algo => {
            return { algo_id: algo._id, mark: 0 };
          })
        )
      : null
  );
  const [rerender, setrerender] = useState(0);
  const [nextQuestionID, setNextQuestionID] = useState(null);

  const onChangemark = (indexOfResponseToChange, mark) => {
    let changedResponses = responses.map((response, index) => {
      if (index === indexOfResponseToChange) {
        return {
          ...response,
          mark
        };
      } else {
        return response;
      }
    });
    setResponses(changedResponses);
  };

  useEffect(() => {
    validator.hideMessages();
    if (props.location.state === "refresh" && props.survey) {
      setResponses(
        _.shuffle(
          props.survey.algorithms.map(algo => {
            return { algo_id: algo._id, mark: 0 };
          })
        )
      );

      setQuestion(
        props.survey.questions.find(
          question => question._id === props.match.params.q_id
        )
      );
    }
    if (props.survey && props.match.params.q_id) {
      let searchNextQuestionID = null;
      props.survey.questions.forEach((question, index, array) => {
        if (question._id === props.match.params.q_id) {
          if (array[index + 1]) {
            searchNextQuestionID = array[index + 1]._id;
          }
        }
      });
      setNextQuestionID(searchNextQuestionID);
    }
  }, [props.location.state, props.match.params.q_id, props.survey]);

  const sortResponses = () => {
    return props.survey.algorithms.map(algo => {
      let responseForAlgorithm = responses.find(response => {
        if (response.algo_id === algo._id) {
          return response;
        }
        return null;
      });
      return responseForAlgorithm;
    });
  };

  if (props.survey) {
    return (
      <div>
        <ul className="list-group">
          <li className="list-group-item">Name : {question.questionName}</li>
          <li className="list-group-item">
            Reference : {question.questionRef.name}
            <Audio url={question.questionRef.url} />
          </li>

          <li className="list-group-item font-weight-bold">Algoritms</li>
          {props.survey.algorithms.map((algo, index) => {
            return (
              <li key={algo._id} className="list-group-item">
                Algo {index + 1}
                <div style={{ color: "red" }}>
                  {validator.message(
                    "quality",
                    responses[index].mark,
                    "required|numeric|min:1,num|max:100,num"
                  )}
                </div>
                <Audio url={question.questionFiles[index].url} />
                <QuestionMarkInput
                  index={index}
                  callback={onChangemark}
                  mark={responses[index].mark}
                />
              </li>
            );
          })}
        </ul>

        <SubmitResponse
          survey_id={props.survey._id}
          nextQuestionID={nextQuestionID}
          validator={validator}
          sortResponses={sortResponses}
          rerender={rerender}
          setrerender={setrerender}
          question_id={props.match.params.q_id}
        />
      </div>
    );
  } else {
    return (
      <div>
        Loading...
        <Link to={`/survey/${props.match.params.id}`}>Go back to survey</Link>
      </div>
    );
  }
}
const mapStateToProps = (state, onwProps) => {
  return {
    survey: state.surveys[onwProps.match.params.id]
  };
};
export default connect(mapStateToProps, { createResponse })(ReadQuestion);
