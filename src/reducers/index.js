import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import favoritesReducer from "./favoritesReducer";



const rootReducer = combineReducers({
  counter: counterReducer,
  favorites: favoritesReducer
});

export default rootReducer;
