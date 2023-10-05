import { combineReducers } from "redux";
import favoritesReducer from "./favoritesReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
  search: searchReducer,
  favorites: favoritesReducer
});

export default rootReducer;
