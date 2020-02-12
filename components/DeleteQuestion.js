import React from "react";
import { connect } from "react-redux";
import { deleteQuestion } from "../redux/actions";
import Modal from "./Modal";
class DeleteSurvey extends React.Component {
  renderModalActions = () => {
    return (
      <>
        <button className="btn btn-secondary m-1" onClick={this.props.callback}>
          Cancel
        </button>
        <button
          className="btn btn-danger m-1"
          onClick={() => {
            this.props.deleteSurvey(this.props._id);
            this.props.callback();
          }}
        >
          Delete
        </button>
      </>
    );
  };
  render() {
    return (
      <div>
        <Modal
          title="Delete Survey"
          content={`confirm delete of survey : ${this.props.survey.name}`}
          actions={this.renderModalActions()}
          onDismiss={() => {
            this.props.callback();
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, onwProps) => {
  return {
    survey: state.surveys[onwProps._id]
  };
};
export default connect(mapStateToProps, { deleteSurvey })(DeleteSurvey);
