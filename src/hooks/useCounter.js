import { useState } from "react";

export const useCounter = (initialState = 0) => {
  const [state, setstate] = useState(initialState);

  const increment = () => {
    setstate(state + 1);
  };

  return {
    state,
    increment,
  };
};
