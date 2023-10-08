import React from "react";
import { withTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { GridDesktop, GridMobile, StyledGrid } from "./search";
import MovieCard from "../components/movieCard/movieCard";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import axios from "axios";

const Favorites = () => {
  const { t } = useTranslation();

  const favoritesIds = useSelector((state) => state.favorites.ids);

  const { data, isLoading, isError } = useQuery([favoritesIds], async () => {
    const moviePromises = favoritesIds.map(async (id) => {
      const apiUrl = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}`;

      try {
        const response = await axios.get(apiUrl);

        return response.data;
      } catch (error) {
        throw new Error(`Failed to fetch data for movie with ID ${id}`);
      }
    });

    const movieDetails = await Promise.all(moviePromises);

    return movieDetails;
  });

  if (isError) {
    return <div>{t("error_fetching_data")}</div>;
  }

  return data && Object.keys(data).length > 0 ? (
    <StyledGrid>
      {data.map((d, i) => {
        return <MovieCard key={i} data={d} />;
      })}
    </StyledGrid>
  ) : (
    <>
      <GridMobile>
        <StyledGrid>
          {Array.from({ length: 3 }, (_, index) => (
            <MovieCard key={index} />
          ))}
          <div className="overlay">
            {!isLoading && t("no_favorites_found_add_some")}
          </div>
        </StyledGrid>
      </GridMobile>
      <GridDesktop>
        <StyledGrid>
          {Array.from({ length: 9 }, (_, index) => (
            <MovieCard key={index} />
          ))}
          <div className="overlay">
            {!isLoading && t("no_favorites_found_add_some")}
          </div>
        </StyledGrid>
      </GridDesktop>
    </>
  );
};

export default withTheme(Favorites);
