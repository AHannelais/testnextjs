import App from "next/app";
import { Provider } from "react-redux";
import Auth0Provider from "../utils/auth0";
import React from "react";
import withRedux from "next-redux-wrapper";
import store from "../redux";
import config from "../utils/auth_config.json";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    //Anything returned here can be accessed by the client
    return { pageProps: pageProps };
  }

  render() {
    //pageProps that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
    const { Component, pageProps, store } = this.props;
    return (
      <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        audience={config.audience}
      >
        <Provider store={store}>
          <div className="container">
            <Component {...pageProps} />
          </div>
        </Provider>
      </Auth0Provider>
    );
  }
}

//makeStore function that returns a new store for every request
const makeStore = () => store;

//withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(MyApp);
