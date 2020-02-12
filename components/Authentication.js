import React, { useState, useEffect } from "react";
import { useAuth0 } from "../utils/auth0";
const Authentication = () => {
  const { isAuthenticated, login, logout } = useAuth0();

  if (!isAuthenticated) {
    return (
      <div>
        <button className="btn btn-primary" onClick={() => login()}>
          Login
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button className="btn btn-warning" onClick={logout}>
          logout
        </button>
      </div>
    );
  }
};
export default Authentication;
