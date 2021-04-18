import React, { useState } from "react";
import { UserContext, GlobalContext } from "../contexts";

const INITIAL_GLOBAL_STATE = {
  taskStatuses: [
    { name: "TODO", value: "TODO" },
    { name: "IN PROGRESS", value: "INPROGRESS" },
    { name: "DONE", value: "DONE" },
  ],
};

const Store = ({ children }) => {
  const [glbState, setGlbState] = useState(INITIAL_GLOBAL_STATE);
  const [user, setUser] = useState({});

  return (
    <GlobalContext.Provider value={[glbState, setGlbState]}>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </GlobalContext.Provider>
  );
};

export default Store;
