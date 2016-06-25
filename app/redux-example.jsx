var redux = require('redux');
var axios = require('axios');

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

// Map Reducer and action generators
// -----------------------
var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
  switch(action.type){
    case 'START_LOCATION_FETCH':
      return {isFetching: true, url: undefined};

    case 'COMPLETE_LOCATION_FETCH':
      return {isFetching: false, url: action.url};

    default: return state;
  }
};

//Actions Generators - Map
var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  };
};

var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  };
};

var fetchLocation = () =>{
  store.dispatch(startLocationFetch());

    axios.get('http://ipinfo.io').then(function(res){
      var loc = res.data.loc;
      var baseUrl = "http://maps.google.com/?q="
      store.dispatch(completeLocationFetch(baseUrl+loc))
    });

};

var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbyReducer,
  movies: movieReducer,
  map: mapReducer
});

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

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

fetchLocation();

store.dispatch(changeName('Doug'));
store.dispatch(addHobby('Skiing'));
store.dispatch(addHobby('Surfing'));
store.dispatch(removeHobby(2));
store.dispatch(changeName('Ted'));
store.dispatch(addMovie('Rocky', 'Romance'));
store.dispatch(addMovie('Rocky II', 'Action'));
store.dispatch(removeMovie(2));
