import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../reducers/favoritesReducer";
import { useTranslation } from "react-i18next";
import Tippy from "@tippyjs/react";

const FavoriteMovie = ({ id }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.ids);

  const isFavorite = favorites.includes(id);

  const toggleFavorite = (id) => {
    if (isFavorite) {
      if (window.confirm(`${t("remove_favorite")}?`)) {
        dispatch(removeFromFavorites(id));
      }
    } else {
      dispatch(addToFavorites(id));
    }
  };

  return (
    <Tippy content={t("add_to_favorite")}>
      <FontAwesomeIcon
        size="xl"
        className="icon"
        onClick={() => toggleFavorite(id)}
        icon={isFavorite ? solid("star") : regular("star")}
      />
    </Tippy>
  );
};

export default FavoriteMovie;
