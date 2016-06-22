var redux = require('redux');

console.log("Redux-todo-example loaded");

var stateDefault = {
  searchText: "",
  showCompleted: false,
  todos: []
};

var reducer = (state=stateDefault, action)=>{
  switch(action.type){
    case 'CHANGE_SEARCHTEXT':
      return {...state, searchText: action.searchText}
    default:
      return state;
  };
};

var store = redux.createStore(reducer)

var currentState = store.getState();
console.log('Current State of todo-example = ', store.getState());

var action = {
  type: "CHANGE_SEARCHTEXT",
  searchText: "Mow"
};

store.dispatch(action);
console.log("searchText should be: Mow.  Actual =  ", store.getState().searchText);
