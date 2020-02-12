import React, { useState } from "react";
import { connect } from "react-redux";
import { createAlgorithm } from "../redux/actions";
import SimpleReactValidator from "simple-react-validator";
import { useAuth0 } from "../auth0";
const validator = new SimpleReactValidator();

const renderCreateAlgorithm = function(
  newAlgorithm,
  onChangeNewAlgo,
  onClickAddNewAlgo
) {
  return (
    <form className="form-group">
      <div className="input-group">
        <input
          className="form-control"
          placeholder="Define New Algorithm"
          id="surveyAlgos"
          value={newAlgorithm}
          onChange={onChangeNewAlgo}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={onClickAddNewAlgo}>
            Create
          </button>
        </div>
      </div>
      <div style={{ color: "red" }}>
        {validator.message("Algorithm", newAlgorithm, "required|max:50")}
      </div>
    </form>
  );
};

const CreateAlgorithm = function(props) {
  const [newAlgorithm, setNewAlgorithm] = useState("");
  const [rerender, setrerender] = useState(0);
  const { userAccessToken } = useAuth0();
  const onClickAddNewAlgorithm = async e => {
    e.preventDefault();

    if (validator.allValid()) {
      validator.hideMessages();
      await props.createAlgorithm({ name: newAlgorithm }, userAccessToken);
      setNewAlgorithm("");
    } else {
      validator.showMessages();
      setrerender(rerender + 1);
    }
  };
  const onChangeNewAlgorithm = e => {
    e.preventDefault();
    setNewAlgorithm(e.target.value);
  };
  return renderCreateAlgorithm(
    newAlgorithm,
    onChangeNewAlgorithm,
    onClickAddNewAlgorithm
  );
};
export default connect(null, { createAlgorithm })(CreateAlgorithm);
