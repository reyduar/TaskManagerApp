import React, { useState, useReducer, useEffect } from "react";
import { authReducer } from "../auth/authReducer";
import { UserContext, GlobalContext, AuthContext } from "../contexts";

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
  const [user, dispatch] = useReducer(authReducer, {}, initReducer);

  useEffect(() => {
    localStorage.setItem("userTaskApp", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <GlobalContext.Provider value={[glbState, setGlbState]}>
        {children}
      </GlobalContext.Provider>
    </AuthContext.Provider>
  );
};

export default Store;
