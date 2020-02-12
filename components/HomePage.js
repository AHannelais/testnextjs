import React from "react";
import ShowSurveyList from "./ShowSurveyList";
import { Link } from "react-router-dom";
import { useAuth0 } from "../auth0";

function HomePage() {
  const { userAccessToken } = useAuth0();
  return (
    <div>
      {userAccessToken ? (
        <Link to="/new_survey" className="btn btn-primary m-1">
          Create New Survey
        </Link>
      ) : null}

      <ShowSurveyList />
    </div>
  );
}

export default HomePage;
