import React from "react";
import ShowSurveyList from "../components/ShowSurveyList";
import Head from "next/head";
const Home = () => {
  return (
    <div>
      <Head>
        <title>Listening Test : Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ShowSurveyList />
    </div>
  );
};
export default Home;
