import React, { useState, useEffect } from "react";
import { withTheme } from "@emotion/react";
import axios from "axios";
import { useQuery } from "react-query";
import { Input } from "antd";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import MovieCard from "../components/movieCard/movieCard";
import { useDispatch, useSelector } from "react-redux";
import { setMovieSearch, setMovies } from "../reducers/searchReducer";
import { rem } from "polished";
import { device } from "../themes/baseTheme";

const Search = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const movies = useSelector((state) => state.search.movies);

  const { data, isError } = useQuery(
    ["movieData", debouncedSearchTerm],
    async () => {
      if (debouncedSearchTerm.trim() === "") {
        return {};
      }

      const apiUrl = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${debouncedSearchTerm}`;

      try {
        const response = await axios.get(apiUrl);
        dispatch(setMovies(response.data.Search));
        return response.data.Search;
      } catch (error) {
        throw new Error("Failed to fetch data");
      }
    },
    {
      enabled: debouncedSearchTerm.trim() !== "",
    }
  );

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 800);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    dispatch(setMovieSearch(searchTerm));
  };

  if (isError) {
    return <div>{t("error_fetching_data")}</div>;
  }

  return (
    <div>
      {console.log(
        "Loaded translations:",
        i18n.getResourceBundle("en", "translation")
      )}

      <StyledInput
        type="search"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={t("search_for_a_movie")}
      />

      {data && Object.keys(data).length > 0 ? (
        <StyledGrid>
          {data.map((d, i) => {
            return <MovieCard key={i} data={d} />;
          })}
        </StyledGrid>
      ) : (
        <StyledGrid>
          {Array.from({ length: 9 }, (_, index) => (
            <MovieCard key={index} />
          ))}
          <div className="overlay">
            {t("no_movies_found_change_the_search")}
          </div>
        </StyledGrid>
      )}
    </div>
  );
};

export const MenuItem = styled(Link)`
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  font-size: ${rem(14)};
  @media ${device.m} {
    font-size: ${rem(18)};
  }

  color: ${(props) =>
    props.current
      ? props.theme.color.white
      : props.theme.color.whiteTransparent75};

  font-weight: ${(props) => props.current && "bold"};
  text-decoration: none;

  .icon {
    transition: all 200ms ease-in-out;
    opacity: 0;
    width: ${rem(0)};
  }

  .label {
    text-transform: capitalize;
    font-size: ${rem(14)};
    @media ${device.m} {
      font-size: ${rem(18)};
    }
  }

  &:hover {
    color: ${(props) => props.theme.color.white};

    .icon {
      opacity: 1;
      width: ${rem(16)};
      padding-left: ${rem(8)};
    }
  }
`;

const StyledInput = styled(Input)`
  margin-bottom: ${rem(16)};
  font-size: ${rem(16)};
  @media ${device.m} {
    font-size: ${rem(18)};
    margin-bottom: ${rem(48)};
  }

  height: ${rem(64)};

  background-color: ${(props) => props.theme.color.overlay};
  border-color: ${(props) => props.theme.color.whiteTransparent75};
  color: ${(props) => props.theme.color.white};

  &::placeholder {
    color: ${(props) => props.theme.color.whiteTransparent75};
  }
`;

export const StyledGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: ${rem(8)};

  @media ${device.m} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.l} {
    grid-template-columns: repeat(3, 1fr);
  }

  .overlay {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.color.whiteTransparent75};

    font-size: ${rem(12)};
    @media ${device.m} {
      font-size: ${rem(14)};
    }
  }
`;

export default withTheme(Search);
