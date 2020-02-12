import React from "react";
import Authentication from "../components/Authentication";
import Head from "next/head";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Listening Test : Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Authentication />
    </div>
  );
};

export default Home;
