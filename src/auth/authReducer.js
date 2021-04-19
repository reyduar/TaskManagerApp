import { type } from "../types/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case type.LOGIN:
      return {
        ...action.payload,
        logged: true,
      };
    case type.LOGOUT:
      return {
        logged: false,
      };

    default:
      return state;
  }
};
