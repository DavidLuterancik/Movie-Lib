import { styled, withTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import FavoriteMovie from "../favoriteMovie/favoriteMovie";
import { device } from "../../themes/baseTheme";
import { Spin } from "antd";

function getMovieDetails(data, t) {
  const detailsData = [
    { label: t("actors"), value: data.Actors },
    { label: t("awards"), value: data.Awards },
    { label: t("box_office"), value: data.BoxOffice },
    { label: t("country"), value: data.Country },
    { label: t("released"), value: data.DVD },
    { label: t("director"), value: data.Director },
    { label: t("genre"), value: data.Genre },
    { label: t("language"), value: data.Language },
    { label: t("metascore"), value: data.Metascore },
    { label: t("production"), value: data.Production },
    { label: t("rated"), value: data.Rated },
    { label: t("released"), value: data.Released },
    { label: t("runtime"), value: data.Runtime },
    { label: t("type"), value: data.Type },
    { label: t("website"), value: data.Website },
    { label: t("writer"), value: data.Writer },
    { label: t("year"), value: data.Year },
    { label: t("imdb_id"), value: data.imdbID },
    { label: t("imdb_rating"), value: data.imdbRating },
    { label: t("imdb_votes"), value: data.imdbVotes },
    { label: t("plot"), value: data.Plot },
  ];

  return (
    <div>
      {detailsData.map((item, index) => (
        <MovieDetails key={index}>
          <p className="label">{item.label}</p>
          <p className="value">{item.value}</p>
        </MovieDetails>
      ))}
    </div>
  );
}

const MovieCardDetail = ({ data: d }) => {
  const { t } = useTranslation();

  if (!d) {
    return (
      <MovieCardWrapper skeleton={true}>
        <MoviePoster skeleton={true}>
          <Spin />
        </MoviePoster>
        <div className="info"></div>
      </MovieCardWrapper>
    );
  }

  return (
    <MovieCardWrapper>
      <MoviePoster>
        <img src={d.Poster} alt={d.Poster} />
      </MoviePoster>

      <div className="info">
        <MovieTitle>
          <div className="text">{d.Title}</div>

          <FavoriteMovie id={d.imdbID} />
        </MovieTitle>

        <div>{getMovieDetails(d, t)}</div>
      </div>
    </MovieCardWrapper>
  );
};

const MovieDetails = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin-bottom: 8px;

  .label {
    width: 80px;
    color: ${(props) => props.theme.color.whiteTransparent75};
    padding-right: 8px;
    margin-right: 8px;
    border-right: 1px solid ${(props) => props.theme.color.whiteTransparent75};
    text-align: right;
    font-size: 12px;
    @media ${device.m} {
      font-size: 14px;
    }
  }

  .value {
    width: 80%;
    font-size: 14px;
    @media ${device.m} {
      font-size: 16px;
    }
  }
`;

const MoviePoster = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  max-width: 512px;
  min-height: 512px;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MovieTitle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

  .text {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 16px;
    @media ${device.m} {
      font-size: 32px;
      margin-bottom: 48px;
    }
  }

  .icon {
    margin-left: 16px;
    color: yellow;
    cursor: pointer;
  }
`;

const MovieCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 512px;
  height: 100%;

  @media ${device.m} {
    flex-direction: row;
    align-items: flex-start;
  }

  background-color: ${(props) => props.theme.color.backgroundLite};
  border-radius: 4px;
  overflow: hidden;

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 16px;

    @media ${device.m} {
      width: 100%;
      padding: 48px;
    }

    .year {
      color: ${(props) => props.theme.color.whiteTransparent75};
      margin-bottom: 8px;
    }

    .type {
      text-transform: capitalize;
      color: ${(props) => props.theme.color.whiteTransparent75};
    }
  }
`;

export default withTheme(MovieCardDetail);
