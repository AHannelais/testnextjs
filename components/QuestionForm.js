import React from "react";
import Upload from "./Upload";
import Audio from "./Audio";
import TextInput from "./TextInput";
import AudioManagementProvider from "./AudioManagement";
function RenderQuestionRef({ questionRef, onChangeQuestionRef, validator }) {
  return (
    <>
      <p>Reference</p>
      <div style={{ color: "red" }}>
        {validator.message("Reference", questionRef, "required")}
      </div>
      <div className="row">
        <Upload onChangeCallback={onChangeQuestionRef} />
        <p>{questionRef ? questionRef.name : ""}</p>
      </div>
      <Audio url={questionRef ? questionRef.url : null} />
    </>
  );
}

function RenderQuestionFile({
  questionFiles,
  algorithm,
  onChangeQuestionFile,
  validator,
  index
}) {
  return (
    <>
      <p>{algorithm}</p>
      <div style={{ color: "red" }}>
        {validator.message(
          `${algorithm}`,
          questionFiles && questionFiles[index] && questionFiles[index].name,
          "required"
        )}
      </div>
      <div className="row">
        <Upload onChangeCallback={e => onChangeQuestionFile(index, e)} />
        <p>{questionFiles[index] ? questionFiles[index].name : ""}</p>
      </div>
      <Audio url={questionFiles[index] ? questionFiles[index].url : null} />
    </>
  );
}

function QuestionForm(props) {
  return (
    <div>
      <AudioManagementProvider>
        <ul className="list-group">
          <li className="list-group-item">
            <TextInput
              id="questionName"
              value={props.questionName}
              onChangeVariable={props.onChangeQuestionName}
              label="Name"
              placeholder="Enter Question Name"
              validator={props.validator}
            />
          </li>
          <li className="list-group-item">
            <RenderQuestionRef {...props} />
          </li>
          <li className="list-group-item font-weight-bold">Algorithms</li>
          {props.algorithms.map((algo, index) => {
            return (
              <li key={algo._id} className="list-group-item">
                <RenderQuestionFile
                  {...props}
                  index={index}
                  algorithm={algo.name}
                />
              </li>
            );
          })}
        </ul>
      </AudioManagementProvider>
    </div>
  );
}

export default QuestionForm;
