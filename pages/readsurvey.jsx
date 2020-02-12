import React from "react";
import ReadSurvey from "../components/EditSurvey";
import Head from "next/head";
import { useRouter } from "next/router";
const Home = () => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Listening Test : Metrics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReadSurvey survey_id={router.query.id} />
    </div>
  );
};

export default Home;
