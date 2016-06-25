var redux = require('redux');

// Name Reducer and action generators
// -----------------------
var nameReducer = (state="Anonymous", action) =>{
  switch(action.type){
    case 'CHANGE_NAME':
      return action.name;

      default: return state;
  }
};

var changeName = (name)=> {
  return {
    type: 'CHANGE_NAME',
    name
  }
};

// Hobby Reducer and action generators
// -----------------------
var nextHobbyId = 1;
var hobbyReducer = (state=[], action) =>{
  switch(action.type){
    case 'ADD_HOBBY':
      return [...state,
     {
       id: nextHobbyId++,
       hobby: action.hobby
     }
   ];
   case "REMOVE_HOBBY":
      return state.filter((hobby)=> hobby.id !== action.id);

    default:
      return state;
       };
 };

 //Actions Generators - Hobbies
var addHobby = (hobby)=>{
  return {
  type: 'ADD_HOBBY',
  hobby
  }
};
var removeHobby = (id)=>{
  return {
    type: "REMOVE_HOBBY",
    id
  }
};


 // Movie Reducer and action generators
 // -----------------------
var nextMovieId = 1
 var movieReducer = (state=[], action) => {
   switch(action.type){
     case "ADD_MOVIE":
        return [...state, {id: nextMovieId++, title: action.title, genre: action.genre}];

    case "REMOVE_MOVIE":
        return state.filter((movie)=>{return movie.id !== action.id});

    default: return state;
   }

 };

//Actions Generators - Movies
     var addMovie = (title, genre) => {
       return {
         type: "ADD_MOVIE",
         title,
         genre
       }
     };

     var removeMovie = (id) => {
       return {
         type: "REMOVE_MOVIE",
         id
       }
     };

var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbyReducer,
  movies: movieReducer
});

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

var state = store.getState();
document.getElementById('app').innerHTML = state.name;

//Subscribe to changes (simple:  callback fn gets run each time state changes)
var unsubscribe = store.subscribe(()=>{
  var state = store.getState();
  document.getElementById('app').innerHTML = state.name;
  console.log("New state ", store.getState());
});
// unsubscribe();


store.dispatch(changeName('Doug'));
store.dispatch(addHobby('Skiing'));
store.dispatch(addHobby('Surfing'));
store.dispatch(removeHobby(2));
store.dispatch(changeName('Ted'));
store.dispatch(addMovie('Rocky', 'Romance'));
store.dispatch(addMovie('Rocky II', 'Action'));


store.dispatch(removeMovie(2));
