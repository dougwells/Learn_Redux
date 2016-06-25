var redux = require('redux');
var thunk = require('redux-thunk').default;
var {nameReducer, hobbyReducer, movieReducer, mapReducer} = require ('./../reducers/index')

export var configure = ()=> {
var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbyReducer,
  movies: movieReducer,
  map: mapReducer
});

var store = redux.createStore(reducer, redux.compose(
  redux.applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
  return store;
};
