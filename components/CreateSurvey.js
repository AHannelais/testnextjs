import React, { useEffect, useState } from "react";
import { createSurvey, fetchAlgorithms } from "../redux/actions";
import { connect } from "react-redux";
import Algorithms from "./Algorithms";
import SimpleReactValidator from "simple-react-validator";
import TextInput from "./TextInput";
import { useAuth0 } from "../auth0";

const validator = new SimpleReactValidator();

const CreateSurvey = function(props) {
  const { userAccessToken, user } = useAuth0();

  const [name, setName] = useState("");
  const [rerender, setRerender] = useState(0);
  const [algorithms, setAlgorithms] = useState([]);
  const doFetchAlgorithms = async () => {
    if (userAccessToken) {
      try {
        await props.fetchAlgorithms(userAccessToken);
      } catch (err) {
        throw new Error(err);
      }
    }
  };
  useEffect(() => {
    doFetchAlgorithms();
  }, [userAccessToken]);
  const onChangeName = e => {
    e.preventDefault();
    setName(e.target.value);
  };

  const onClickSaveNewSurvey = e => {
    e.preventDefault();
    if (validator.allValid() && userAccessToken) {
      props.createSurvey(
        { name, algorithms, user: user.name },
        userAccessToken
      );
    } else {
      validator.showMessages();
      // rerender to show messages for the first time
      setRerender(rerender + 1);
    }
  };

  const onClickAddToAlgos = selectedAlgorithm => {
    setAlgorithms(algorithms.concat(selectedAlgorithm));
  };

  const onClickDeleteAlgo = algoToDelete => {
    setAlgorithms(algorithms.filter(algo => algo !== algoToDelete));
  };

  return (
    <div className="container">
      <p className="font-weight-bold">Create a new Survey</p>
      <TextInput
        label="Name"
        placeholder="Enter Survey Name"
        value={name}
        id="surveyName"
        onChangeVariable={onChangeName}
        validator={validator}
      />

      <Algorithms
        validator={validator}
        selectedAlgorithms={algorithms}
        onClickAddToAlgos={onClickAddToAlgos}
        onClickDeleteAlgo={onClickDeleteAlgo}
      />
      <button className="btn btn-secondary m-1" onClick={onClickSaveNewSurvey}>
        Next Step
      </button>
    </div>
  );
};

export default connect(null, {
  createSurvey,
  fetchAlgorithms
})(CreateSurvey);
