const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
  loading: false,
  user: [],
  error: "",
};

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCESS = "FETCH_USERS_SUCESS";
const FETCH_USERS_FAILUR = "FETCH_USERS_FAILUR";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSucess = (users) => {
  return {
    type: FETCH_USERS_SUCESS,
    payload: users,
  };
};

const fetchUsersfailur = (error) => {
  return {
    type: FETCH_USERS_FAILUR,
    payload: error,
  };
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        // response.data
        const users = response.data.map((user) => user.id);
        dispatch(fetchUsersSucess(users));
      })
      .catch((error) => {
        //error.message
        dispatch(fetchUsersfailur(error.message));
      });
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USERS_SUCESS:
      return {
        ...state,
        user: action.payload,
        error: "",
      };

    case FETCH_USERS_FAILUR:
      return {
        ...state,
        user: [],
        error: action.payload,
      };
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchUsers());
