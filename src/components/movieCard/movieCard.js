import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin } from "antd";
import { styled, withTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import FavoriteMovie from "../favoriteMovie/favoriteMovie";

function getMovieDetails(data, t) {
  const detailsData = [
    { label: t("Actors"), value: data.Actors },
    { label: t("Awards"), value: data.Awards },
    { label: t("Box Office"), value: data.BoxOffice },
    { label: t("Country"), value: data.Country },
    { label: t("DVD Release Date"), value: data.DVD },
    { label: t("Director"), value: data.Director },
    { label: t("Genre"), value: data.Genre },
    { label: t("Language"), value: data.Language },
    { label: t("Metascore"), value: data.Metascore },
    { label: t("Production"), value: data.Production },
    { label: t("Rated"), value: data.Rated },
    { label: t("Released"), value: data.Released },
    { label: t("Runtime"), value: data.Runtime },
    { label: t("Type"), value: data.Type },
    { label: t("Website"), value: data.Website },
    { label: t("Writer"), value: data.Writer },
    { label: t("Year"), value: data.Year },
    { label: t("IMDb ID"), value: data.imdbID },
    { label: t("IMDb Rating"), value: data.imdbRating },
    { label: t("IMDb Votes"), value: data.imdbVotes },
    { label: t("Plot"), value: data.Plot },
  ];

  return (
    <div>
      {detailsData.map((item, index) => (
        <MovieDetails key={index}>
          <div className="label">{item.label}</div>
          <div className="value">{item.value}</div>
        </MovieDetails>
      ))}
    </div>
  );
}

const MovieCard = ({ data: d, small = true }) => {
  const { t } = useTranslation();

  const getPoster = () => {
    return (
      <MoviePoster small={small}>
        <img src={d.Poster} alt={d.Poster} />
      </MoviePoster>
    );
  };

  const getTitle = () => {
    return (
      <MovieTitle small={small}>
        <div className="text">{d.Title}</div>

        <FavoriteMovie id={d.imdbID}/>

       
      
      </MovieTitle>
    );
  };

  if (!d) {
    return <Spin />;
  }

  if (small) {
    return (
      <MovieCardWrapper small={small}>
        {getPoster()}

        <div className="info">
          {getTitle()}

          <MovieCardFooter>
            <div>
              <div className="year">{d.Year}</div>
              <div className="type">{d.Type}</div>
            </div>

            <div className="link">
              <ShowDetail to={`/detail/${d.imdbID}`}>
                <div className="label">{t("show info")}</div>
                <div className="icon">
                  <FontAwesomeIcon icon={solid("arrow-right")} />
                </div>
                <div className="underline" />
              </ShowDetail>
            </div>
          </MovieCardFooter>
        </div>
      </MovieCardWrapper>
    );
  } else {
    return (
      <MovieCardWrapper small={small}>
        {getPoster()}

        <div className="info">
          {getTitle()}

          <div>{getMovieDetails(d, t)}</div>
        </div>
      </MovieCardWrapper>
    );
  }
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
    font-size: 14px;
  }

  .value {
    width: 80%;
    font-size: 16px;
  }
`;

const MoviePoster = styled.div`
  width: ${(props) => (props.small ? "256px" : "512px")};
  height: 100%;
  overflow: hidden;

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
    font-size: ${(props) => (props.small ? "18px" : "32px")};
    font-weight: bold;
    margin-bottom: ${(props) => (props.small ? "8px" : "32px")};
  }

  .icon {
    margin-left: 16px;
    color: yellow;
    cursor: pointer;
  }
`;

const ShowDetail = styled(Link)`
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

const MovieCardWrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: ${(props) => props.theme.color.backgroundLite};
  border-radius: 4px;
  overflow: hidden;

  .info {
    display: flex;
    flex-direction: column;
    justify-content: ${(props) =>
      props.small ? "space-between" : "flex-start"};
    width: 100%;
    padding: ${(props) => (props.small ? `18px` : "48px")};

    .year {
      color: ${(props) => props.theme.color.whiteTransparent75};
      margin-bottom: 8px;
    }

    .type {
      text-transform: capitalize;
      color: ${(props) => props.theme.color.whiteTransparent75};
    }
  }

  &:hover {
    transition: all 400ms ease-in-out;
    box-shadow: ${(props) => props.small && `black 0px 0px 64px 0px;`};
    transform: ${(props) => props.small && `scale(1.1)`};
  }
`;

const MovieCardFooter = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
`;

export default withTheme(MovieCard);
