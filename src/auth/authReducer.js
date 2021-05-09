import { type } from "../types/types";
export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case type.LOGIN:
      return {
        logged: true,
        ...action.payload,
      };

    case type.LOGOUT:
      return {
        logged: false,
      };
    default:
      return state;
  }
};
