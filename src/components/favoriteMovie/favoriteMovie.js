import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../reducers/favoritesReducer";

const FavoriteMovie = ({ id }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.ids);

  const isFavorite = favorites.includes(id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(id));
    }
  };

  return (
    <div className="icon" onClick={() => toggleFavorite(id)}>
      {isFavorite ? (
        <FontAwesomeIcon icon={solid("star")} />
      ) : (
        <FontAwesomeIcon icon={regular("star")} />
      )}
    </div>
  );
};

export default FavoriteMovie;
