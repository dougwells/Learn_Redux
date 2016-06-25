var redux = require('redux');


console.log("Starting Redux Example App");

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();
var reducers = require('./reducers/index');



var state = store.getState();
document.getElementById('app').innerHTML = state.name;

//Subscribe to changes (simple:  callback fn gets run each time state changes)
var unsubscribe = store.subscribe(()=>{
  var state = store.getState();
  console.log("New state ", store.getState());
  if (state.map.isFetching){
    document.getElementById('app').innerHTML = 'Loading ...';
  }else if (state.map.url){
    document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View Your Location</a>';
  }else {
    document.getElementById('app').innerHTML = '... ERROR !! ...';
  }
});
// unsubscribe();

store.dispatch(actions.fetchLocation());
store.dispatch(actions.changeName('Doug'));
store.dispatch(actions.addHobby('Skiing'));
store.dispatch(actions.addHobby('Surfing'));
store.dispatch(actions.removeHobby(2));
store.dispatch(actions.changeName('Ted'));
store.dispatch(actions.addMovie('Rocky', 'Romance'));
store.dispatch(actions.addMovie('Rocky II', 'Action'));
store.dispatch(actions.removeMovie(2));
