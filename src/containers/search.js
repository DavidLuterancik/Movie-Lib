import React, { useState, useEffect } from "react";
import { withTheme } from "@emotion/react";
import axios from "axios";
import { useQuery } from "react-query";
import { Input } from "antd";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import MovieCard from "../components/movieCard/movieCard";

const Search = () => {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const { data, isError } = useQuery(
    ["movieData", debouncedSearchTerm],
    async () => {
      if (debouncedSearchTerm.trim() === "") {
        return {};
      }

      const apiUrl = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${debouncedSearchTerm}`;

      try {
        const response = await axios.get(apiUrl);
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
  };

  if (isError) {
    return <div>{t("Error fetching data")}</div>;
  }

  return (
    <div>
      <StyledInput
        type="search"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={t("Search for a movie")}
      />

      {data && Object.keys(data).length > 0 ? (
        <StyledGrid>
          {data.map((d) => {
            return <MovieCard data={d} />;
          })}
        </StyledGrid>
      ) : (
        <div>{t("No movie data available.")}</div>
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
  font-size: 18px;
  color: ${(props) =>
    props.current
      ? props.theme.color.white
      : props.theme.color.whiteTransparent75};

  font-weight: ${(props) => props.current && "bold"};
  text-decoration: none;

  .icon {
    transition: all 200ms ease-in-out;
    opacity: 0;
    width: 0;
  }

  .label {
    text-transform: capitalize;
  }

  &:hover {
    color: ${(props) => props.theme.color.white};

    .icon {
      opacity: 1;
      width: 16px;
      padding-left: 8px;
    }
  }
`;

const StyledInput = styled(Input)`
  margin-bottom: 48px;
  height: 64px;
  font-size: 18px;

  background-color: ${(props) => props.theme.color.overlay};
  border-color: ${(props) => props.theme.color.whiteTransparent75};
  color: ${(props) => props.theme.color.white};

  &::placeholder {
    color: ${(props) => props.theme.color.whiteTransparent75};
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;
`;

export default withTheme(Search);
