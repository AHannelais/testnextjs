import React from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import history from "../history";
import HomePage from "./HomePage";
import CreateSurvey from "./CreateSurvey";
import EditSurvey from "./EditSurvey";
import ReadQuestion from "./ReadQuestion";
import Authentication from "./Authentication";
import Questions from "./Questions";
import Metrics from "./Metrics";
import AudioManagementProvider from "./AudioManagement";

function App() {
  return (
    <div className="container">
      <AudioManagementProvider>
        <Router history={history}>
          <Link to="/" className="btn btn-warning m-1">
            Back to HomePage
          </Link>
          <div>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/admin" exact component={Authentication} />
              <Route path="/new_survey" exact component={CreateSurvey} />
              <Route path="/survey/:id" exact component={EditSurvey} />
              <Route
                path="/survey/:id/new_question"
                exact
                component={Questions}
              />
              <Route path="/metrics/:id" exact component={Metrics} />
              <Route
                path="/survey/:id/edit/:q_id"
                exact
                component={Questions}
              />
              <Route path="/survey/:id/:q_id" exact component={ReadQuestion} />
            </Switch>
          </div>
        </Router>
      </AudioManagementProvider>
    </div>
  );
}

export default App;
