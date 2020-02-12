import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchMetricsBySurvey, updateMetricsBySurvey } from "../redux/actions";
import DisplayMetrics from "./DisplayMetrics";
import { useAuth0 } from "../auth0";

function Metrics(props) {
  const { userAccessToken } = useAuth0();
  const [metrics, setMetrics] = useState(props.metrics || null);

  const fetchPreviousMetrics = async () => {
    let response;
    try {
      response = await props.fetchMetricsBySurvey(
        props.match.params.id,
        userAccessToken
      );
    } catch (err) {
      console.log(err);
    }
    if (response) {
      setMetrics(response);
    }
  };

  const getUpdatedMetrics = async () => {
    try {
      await props.updateMetricsBySurvey(props.match.params.id, userAccessToken);
    } catch (err) {
      console.log(err);
    }
    fetchPreviousMetrics();
  };
  useEffect(() => {
    if (userAccessToken) {
      fetchPreviousMetrics();
    }
  }, [userAccessToken]);
  if (metrics) {
    return (
      <div>
        <button className="btn btn-primary m-1" onClick={getUpdatedMetrics}>
          Update
        </button>

        <DisplayMetrics metrics={metrics} />
      </div>
    );
  } else {
    return (
      <button className="btn btn-primary m-1" onClick={getUpdatedMetrics}>
        Get new metrics
      </button>
    );
  }
}
const mapStateToProps = (state, onwProps) => {
  return { metrics: state.metrics[onwProps.match.params.id] };
};
export default connect(mapStateToProps, {
  fetchMetricsBySurvey,
  updateMetricsBySurvey
})(Metrics);
