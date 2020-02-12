import React from "react";

import Boxplot from "./Boxplot";

const formatedDate = date => {
  date = new Date(date);
  const year = date.getFullYear();
  let month = date.getMonth();
  const corrected = variable => {
    if (variable <= 9) {
      variable = `0${variable}`;
    }
    return variable;
  };

  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  return `${corrected(day)}/${corrected(month)}/${year} at ${corrected(
    hours
  )}:${corrected(minutes)}`;
};

const DisplayMetrics = props => {
  return (
    <div className="container">
      <h2>Metrics</h2>
      <p>Last Update : {formatedDate(props.metrics.lastUpdated)}</p>
      <div style={{ display: "flex" }}>
        {props.metrics.algorithms.map(algo => {
          return (
            <div key={algo.algo_id}>
              <h3>{algo.algoName}</h3>
              <div style={{ display: "flex" }}>
                <Boxplot
                  width={50}
                  height={400}
                  orientation="vertical"
                  min={0}
                  max={100}
                  scaleBar={{ width: 30 }}
                  stats={{
                    whiskerLow: algo.D1,
                    quartile1: algo.Q1,
                    quartile2: algo.median,
                    quartile3: algo.Q3,
                    whiskerHigh: algo.D9
                  }}
                />

                <h4>Data</h4>
                <ul>
                  <li>Total : {algo.total}</li>
                  <li>Median : {algo.median}</li>
                  <li>First Quartil : {algo.Q1}</li>
                  <li>Last Quartil : {algo.Q3}</li>
                  <li>First Decil : {algo.D1}</li>
                  <li>Last Decil : {algo.D9}</li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayMetrics;
