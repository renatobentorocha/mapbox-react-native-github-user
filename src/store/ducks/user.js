/**
 * Types
 */
export const Types = {
  ADD_REQUEST: "Users/ADD_REQUEST",
  ADD_SUCCESS: "Users/ADD_SUCCESS",
  ADD_FAILURE: "Users/ADD_FAILURE",
  CLEAR_FAILURE: "Users/CLEAR_FAILURE",
  DELETE_REQUEST: "Users/DELETE_REQUEST",
  DELETE_SUCCESS: "Users/DELETE_SUCCESS"
};
/**
 * Reducers
 */

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true };

    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: [...state.data, action.payload.data]
      };

    case Types.ADD_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case Types.CLEAR_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case Types.DELETE_REQUEST:
      return { ...state, loading: true };

    case Types.DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: [...action.payload.data]
      };

    default:
      return state;
  }
}

/**
 * Actions
 */
export const Creators = {
  addUserRequest: (user, cordinates) => ({
    type: Types.ADD_REQUEST,
    payload: { user, cordinates }
  }),

  addUserSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data }
  }),

  addUserFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error }
  }),

  clearUsersError: () => ({
    type: Types.CLEAR_FAILURE,
    payload: null
  }),

  deleteUserRequest: id => ({
    type: Types.DELETE_REQUEST,
    payload: { id }
  }),
  deleteUserSuccess: data => ({
    type: Types.DELETE_SUCCESS,
    payload: { data }
  })
};
