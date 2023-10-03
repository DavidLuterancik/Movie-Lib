import React, { useState, useEffect } from "react";
import { withTheme } from "@emotion/react";
import axios from "axios";
import { useQuery } from "react-query";
import { Input } from "antd";
import { useTranslation } from "react-i18next";

const MovieDetails = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t("movie Details")}</h2>
      <p>
        {t("actors")}: {data.Actors}
      </p>
      <p>
        {t("awards")}: {data.Awards}
      </p>
      <p>
        {t("box Office")}: {data.BoxOffice}
      </p>
      <p>
        {t("country")}: {data.Country}
      </p>
      <p>
        {t("director")}: {data.Director}
      </p>
      <p>
        {t("genre")}: {data.Genre}
      </p>
      <p>
        {t("language")}: {data.Language}
      </p>
      <p>
        {t("metascore")}: {data.Metascore}
      </p>
      <p>
        {t("plot")}: {data.Plot}
      </p>
      <p>
        {t("rated")}: {data.Rated}
      </p>
      <p>
        {t("released")}: {data.Released}
      </p>
      <p>
        {t("Runtime")}: {data.Runtime}
      </p>
      <p>
        {t("title")}: {data.Title}
      </p>
    </div>
  );
};

const Search = (props) => {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const { data, isError } = useQuery(
    ["movieData", debouncedSearchTerm],
    async () => {
      if (debouncedSearchTerm.trim() === "") {
        return {};
      }

      const apiKey = "98cfee95";
      const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${debouncedSearchTerm}`;

      try {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        return response.data;
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
      <Input
        type="search"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for a movie"
      ></Input>
      {data && Object.keys(data).length > 0 ? (
        <MovieDetails data={data} />
      ) : (
        <div>{t("No movie data available.")}</div>
      )}
    </div>
  );
};

export default withTheme(Search);
