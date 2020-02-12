import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
const Auth0Provider = ({ children, ...initOptions }) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [userAccessToken, setUserAccessToken] = useState();
  const initAuth0 = async () => {
    const auth0 = await createAuth0Client(initOptions);
    setAuth0(auth0);
    const isAuthenticated = await auth0.isAuthenticated();
    setIsAuthenticated(isAuthenticated);
    if (isAuthenticated) {
      const user = await auth0.getUser();
      setUser(user);
      const userAccessToken = await auth0.getTokenSilently();
      setUserAccessToken(userAccessToken);
    }
  };

  useEffect(() => {
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const login = async () => {
    try {
      await auth0Client.loginWithPopup();
    } catch (error) {
      console.error(error);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    if (user) {
      setIsAuthenticated(true);
    }
  };
  const logout = async (params = null) => {
    try {
      await auth0Client.logout(params);
    } catch (error) {
      console.error(error);
    }
  };
  const hasAccessToRessource = function(owner) {
    if (
      user &&
      user.locale.find(elem => {
        return elem === "admin:surveys";
      })
    ) {
      return true;
    } else if (user && owner.userId === user.sub) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        userAccessToken,
        hasAccessToRessource
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

export default Auth0Provider;
