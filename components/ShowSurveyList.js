import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../redux/actions";
import DeleteSurvey from "./DeleteSurvey";
import Router from "next/router";
import Link from "next/link";
import { useAuth0 } from "../utils/auth0";

const ShowSurveyList = function(props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { hasAccessToRessource } = useAuth0();
  // fetch surveys from API on start

  useEffect(() => {
    props.fetchSurveys();
  }, []);

  const renderActions = survey => {
    if (hasAccessToRessource(survey.owner)) {
      return (
        <>
          <button
            onClick={e => {
              e.stopPropagation();
              setShowDeleteModal(survey._id);
            }}
            className="btn btn-danger m-1"
          >
            Delete
          </button>
          <Link href={`/metrics/${survey._id}`}>
            <a
              className="btn btn-primary"
              onClick={e => {
                e.stopPropagation();
              }}
            >
              {" "}
              Get results
            </a>
          </Link>
        </>
      );
    } else {
      return <button className="btn btn-primary m-1">Answer Survey</button>;
    }
  };
  // Render the list of surveys
  const renderList = () => {
    return (
      <table className="table table-hover ">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Created by</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.surveys.map(survey => {
            return (
              <tr
                key={survey._id}
                onClick={() => Router.push(`/survey/${survey._id}`)}
              >
                <td> {survey.name}</td>
                <td>{survey.owner.userName}</td>
                <td>{renderActions(survey)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  // renders delete modal of slected survey if user has clicked on delete button
  const renderDelete = () => {
    return showDeleteModal ? (
      <DeleteSurvey _id={showDeleteModal} callback={dismissDelete} />
    ) : null;
  };
  const dismissDelete = () => {
    setShowDeleteModal(null);
  };

  return (
    <div>
      <h2>Listening Surveys</h2>
      {renderDelete()}
      {renderList()}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    surveys: Object.values(state.surveys)
  };
};

export default connect(mapStateToProps, { fetchSurveys })(ShowSurveyList);
