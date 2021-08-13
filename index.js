const redux = require("redux");

const createStore = redux.createStore;

const combineReducers = redux.combineReducers;

const BUY_CAKE = "BUY_CAKE";
const ADD_CAKE = "ADD_CAKE";
const BUT_ICECREAM = "BUY_ICECREAM";

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
}

function addCake() {
  return {
    type: ADD_CAKE,
    info: "adding a cake",
  };
}

function buyIcecream() {
  return {
    type: BUT_ICECREAM,
    info: "buy ice cream",
  };
}

// const initialState = {
//   numberOfCakes: 100,
//   numberOfIcecreams: 50,
// };

const initialCakeState = {
  numberOfCakes: 100,
};

const initialIcecreamState = {
  numberOfIcecreams: 50,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };
    case ADD_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + 1,
      };

    case BUT_ICECREAM:
      return {
        ...state,
        numberOfIcecreams: state.numberOfIcecreams - 1,
      };

    default:
      return state;
  }
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };
    case ADD_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + 1,
      };

    default:
      return state;
  }
};

const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case BUT_ICECREAM:
      return {
        ...state,
        numberOfIcecreams: state.numberOfIcecreams - 1,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer,
});

const store = createStore(rootReducer);

console.log("initial state", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("updated state", store.getState())
);

store.dispatch(buyIcecream());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
store.dispatch(addCake());

unsubscribe();
