import { taskServices } from "../../api";
import { types } from "../types/actionTypes";

export function searchTasks(searchTerm) {
  return (dispatch) => {
    dispatch(fetchTasks(searchTerm));
    taskServices.findByName(searchTerm).then(
      (data) => {
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(fetchTasksSuccess(arrayData));
      },
      (error) => {
        dispatch(fetchTasksError(error));
      }
    );
  };
}

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
