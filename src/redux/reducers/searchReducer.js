import { types } from "../types/actionTypes";

const initialState = {
  tasks: [],
  searchTerm: "",
  loading: false,
  errors: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
        searchTerm: action.payload.searchTerm,
        errors: null,
      };
    case types.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload.tasks,
      };
    case types.FETCH_TASKS_ERROR:
      return {
        ...state,
        loading: false,
        tasks: [],
        errors: action.payload.errors,
      };
    default:
      return state;
  }
};

export default searchReducer;
