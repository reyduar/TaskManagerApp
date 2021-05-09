import React, { useState, useReducer, useEffect } from "react";
import { authReducer } from "../auth/authReducer";
import { GlobalContext, AuthContext } from "../contexts";

const INITIAL_GLOBAL_STATE = {
  taskStatuses: [
    { name: "TODO", value: "TODO" },
    { name: "IN PROGRESS", value: "INPROGRESS" },
    { name: "DONE", value: "DONE" },
  ],
};

const initReducer = () => {
  return JSON.parse(localStorage.getItem("userTaskApp")) || { logged: false };
};

const Store = ({ children }) => {
  const [glbState, setGlbState] = useState(INITIAL_GLOBAL_STATE);
  const [auth, dispatch] = useReducer(authReducer, {}, initReducer);

  useEffect(() => {
    localStorage.setItem("userTaskApp", JSON.stringify(auth));
  }, [auth]);

  return (
    <GlobalContext.Provider value={[glbState, setGlbState]}>
      <AuthContext.Provider value={{ auth, dispatch }}>
        {children}
      </AuthContext.Provider>
    </GlobalContext.Provider>
  );
};

export default Store;
