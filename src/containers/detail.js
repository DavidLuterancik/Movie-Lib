import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { withTheme } from "styled-components";
import MovieCard from "../components/movieCard/movieCard";

const Detail = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}`;
        const { data } = await axios.get(apiUrl);

        setData(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [id]);

  return <MovieCard data={data} small={false} />;
};

export default withTheme(Detail);
