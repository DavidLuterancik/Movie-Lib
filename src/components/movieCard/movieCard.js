import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled, withTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import FavoriteMovie from "../favoriteMovie/favoriteMovie";
import { device } from "../../themes/baseTheme";
import { Spin } from "antd";

const MovieCard = ({ data: d, small = true, isLoading }) => {
  const { t } = useTranslation();

  const getPoster = () => {
    return (
      <MoviePoster small={small}>
        <img width={256} src={d.Poster} alt={d.Poster} />
      </MoviePoster>
    );
  };

  const getTitle = () => {
    return (
      <MovieTitle small={small}>
        <Link className="text" to={`/detail/${d.imdbID}`}>
          {d.Title}
        </Link>

        <FavoriteMovie id={d.imdbID} />
      </MovieTitle>
    );
  };

  if (!d) {
    return (
      <MovieCardWrapper small={small} skeleton={true}>
        <MoviePoster small={small} skeleton={true}></MoviePoster>
        <div className="info"></div>
      </MovieCardWrapper>
    );
  }

  if (isLoading)
    return (
      <MovieCardWrapper small={small} skeleton={true}>
        <MoviePoster small={small} skeleton={true}>
          <Spin />
        </MoviePoster>
        <div className="info"></div>
      </MovieCardWrapper>
    );

  return (
    <MovieCardWrapper small={small}>
      <Link className="link" to={`/detail/${d.imdbID}`}>
        {getPoster()}
      </Link>

      <div className="info">
        {getTitle()}

        <MovieCardFooter>
          <div>
            <div className="year">{d.Year}</div>
            <div className="type">{d.Type}</div>
          </div>

          <ShowDetail to={`/detail/${d.imdbID}`}>
            <div className="label">{t("show_info")}</div>
            <div className="icon">
              <FontAwesomeIcon icon={solid("arrow-right")} />
            </div>
            <div className="underline" />
          </ShowDetail>
        </MovieCardFooter>
      </div>
    </MovieCardWrapper>
  );
};

const MoviePoster = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 256px;
  overflow: hidden;
  color: white;
  font-size: 10px;

  @media ${device.m} {
    width: 256px;
  }

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
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: ${(props) => (props.small ? "8px" : "32px")};
    font-size: 18px;
    color: white;

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
  align-items: flex-end;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  width: 150px;
  height: 48px;

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

  .link {
    text-decoration: none;
  }
`;

const MovieCardFooter = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
  height: 48px;
  font-size: 10px;
  @media ${device.m} {
    font-size: 14px;
  }
`;

export default withTheme(MovieCard);
