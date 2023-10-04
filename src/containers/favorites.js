import React from "react";
import { withTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";

const Favorites = (props) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.ids);

  return <div>{favorites.map((id) => id)}</div>;
};

export default withTheme(Favorites);
