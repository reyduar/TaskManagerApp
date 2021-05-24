import { types } from "../../types/actionTypes";

export function fetchTasks(searchTerm) {
  return {
    type: types.FETCH_TASKS_REQUEST,
    payload: {
      searchTerm,
    },
  };
}

export function fetchTasksSuccess(tasks) {
  return {
    type: types.FETCH_TASKS_SUCCESS,
    payload: {
      tasks,
    },
  };
}

export function fetchTasksError(errors) {
  return {
    type: types.FETCH_TASKS_ERROR,
    payload: {
      errors,
    },
  };
}
