var redux = require('redux');

console.log("Redux-todo-example loaded");

var stateDefault = {
  searchText: "Initial Search Term",
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

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension(): f=>f
));

var currentState = store.getState();
console.log('Current State of todo-example = ', store.getState().searchText);

//Subscribe to changes
var unsubscribe = store.subscribe(()=>{
  var state = store.getState();
  console.log("new state is: ", state);
  document.getElementById('app').innerHTML = state.searchText;
});


var action = {
  type: "CHANGE_SEARCHTEXT",
  searchText: "First Change"
};

store.dispatch(action);
console.log("searchText should be: First Change.  Actual =  ", store.getState().searchText);

store.dispatch({type: "CHANGE_SEARCHTEXT", searchText: "Second ..."});
console.log("searchText should be: Second Change.  Actual =  ", store.getState().searchText);

store.dispatch({type: "CHANGE_SEARCHTEXT", searchText: "Third ..."});
console.log("searchText should be: Third Change.  Actual =  ", store.getState().searchText);
