import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled, withTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import FavoriteMovie from "../favoriteMovie/favoriteMovie";
import { device } from "../../themes/baseTheme";

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

        <FavoriteMovie id={d.imdbID} />
      </MovieTitle>
    );
  };

  if (!d) {
    return (
      <MovieCardWrapper small={small} skeleton={true}>
        <MoviePoster small={small} skeleton={true} />
      </MovieCardWrapper>
    );
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
                <div className="label">{t("show_info")}</div>
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
  width: 100%;
  height: 256px;
  @media ${device.m} {
    width: ${(props) => (props.small ? "256px" : "512px")};
    height: ${(props) => (props.skeleton ? "256px" : "100%")};
  }
  min-height: 256px;
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

    font-weight: bold;
    margin-bottom: ${(props) => (props.small ? "8px" : "32px")};

    font-size: 18px;
    @media ${device.m} {
      font-size: ${(props) => (props.small ? "18px" : "32px")};
    }
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

  font-size: 12px;
  @media ${device.m} {
    font-size: 14px;
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
  flex-direction: column;
  justify-content: center;

  @media ${device.m} {
    flex-direction: row;
  }

  background-color: ${(props) =>
    props.skeleton
      ? props.theme.color.backgroundSkeleton
      : props.theme.color.backgroundLite};
  border-radius: 4px;
  overflow: hidden;

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 16px;

    @media ${device.m} {
      width: 100%;
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

  &:hover {
    @media ${device.m} {
      transition: all 400ms ease-in-out;
      box-shadow: ${(props) =>
        props.small && !props.skeleton && `black 0px 0px 64px 0px;`};

      transform: ${(props) => props.small && !props.skeleton && `scale(1.1)`};
    }
  }
`;

const MovieCardFooter = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 10px;
  @media ${device.m} {
    font-size: 14px;
  }
`;

export default withTheme(MovieCard);
