var redux = require('redux');

console.log("Redux-todo-example loaded");

var stateDefault = {
  searchText: "",
  showCompleted: false,
  todos: []
};

var reducer = (state=stateDefault, action)=>{
  return state;
};

var store = redux.createStore(reducer)

var currentState = store.getState();
console.log('Current State of todo-example = ', currentState);
