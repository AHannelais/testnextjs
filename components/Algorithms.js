import React, { useState, useEffect } from "react";
import { createSurvey, fetchAlgorithms } from "../redux/actions";
import CreateAlgorithm from "./CreateAlgorithm";
import { connect } from "react-redux";

const Algorithms = function(props) {
  const [remainingAlgorithms, setRemainingAlgorithms] = useState(
    props.algorithms
  );
  const [algorithms, setAlgorithms] = useState(props.algorithms);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");

  useEffect(() => {
    setRemainingAlgorithms(remainingAlgorithms =>
      remainingAlgorithms.concat(
        props.algorithms.filter((algo, index) => {
          return !algorithms[index] || algo._id !== algorithms[index]._id;
        })
      )
    );
    setAlgorithms(props.algorithms);
  }, [props.algorithms, algorithms]);

  const onChangeSetAlgorithm = e => {
    e.preventDefault();
    setSelectedAlgorithm(
      algorithms.find(algo => {
        return algo._id === e.target.value;
      })
    );
  };
  const onClickAddToAlgos = e => {
    e.preventDefault();
    if (selectedAlgorithm) {
      props.onClickAddToAlgos(selectedAlgorithm);
      setRemainingAlgorithms(
        remainingAlgorithms.filter(algo => {
          return algo !== selectedAlgorithm;
        }),
        setSelectedAlgorithm("")
      );
    }
  };
  const onClickDeleteAlgo = (e, algoToDelete) => {
    e.preventDefault();
    props.onClickDeleteAlgo(algoToDelete);
    setRemainingAlgorithms(remainingAlgorithms.concat(algoToDelete));
  };

  return (
    <>
      <p>Algorithms</p>

      <CreateAlgorithm />
      <div className="input-group">
        <div className="input-group-prepend">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={onClickAddToAlgos}
          >
            Add
          </button>
        </div>
        <select
          className="custom-select"
          value={props.selectedAlgorithm}
          onChange={onChangeSetAlgorithm}
          disabled={remainingAlgorithms.length === 0 ? true : false}
        >
          <option value="" defaultValue>
            Choose an Algorithm to Add ...
          </option>
          {remainingAlgorithms.map(algo => (
            <option value={algo._id} key={algo._id}>
              {algo.name}
            </option>
          ))}
        </select>
      </div>
      <p> Selected</p>

      <ul>
        {props.selectedAlgorithms.map(algo => (
          <li key={algo._id}>
            <button
              className="btn btn-danger m-1"
              onClick={e => onClickDeleteAlgo(e, algo)}
            >
              <i style={{ color: "white" }} className="fas fa-times"></i>
            </button>
            {algo.name}
          </li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = state => {
  return {
    algorithms: Object.values(state.algorithms)
  };
};
export default connect(mapStateToProps, {
  createSurvey,
  fetchAlgorithms
})(Algorithms);
