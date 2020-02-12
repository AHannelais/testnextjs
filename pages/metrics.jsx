import React from "react";
import Metrics from "../components/Metrics";
import Head from "next/head";
const Home = () => (
  <div>
    <Head>
      <title>Listening Test : Metrics</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Metrics />
  </div>
);
export default Home;
