import React from "react";

function QuestionMarkInput(props) {
  function onChangeMark(e) {
    e.preventDefault();

    props.callback(props.index, e.target.value);
  }

  return (
    <div>
      <form>
        <p>Quality : {props.mark}</p>
        <input
          type="range"
          min="1"
          max="100"
          value={props.mark}
          className="slider"
          id="slider"
          onChange={e => onChangeMark(e)}
        />
      </form>
    </div>
  );
}
export default QuestionMarkInput;
