import React, { useState, useEffect } from "react";
import { withTheme } from "@emotion/react";
import axios from "axios";
import { Button, Input, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import MovieCard from "../components/movieCard/movieCard";
import { useDispatch, useSelector } from "react-redux";

import { rem } from "polished";
import { device } from "../themes/baseTheme";
import {
  setStateData,
  setStatePage,
  setStateSearchTerm,
  setStateTotal,
} from "../reducers/searchReducer";

const Search = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const prevSearchTerm = useSelector((state) => state.search.searchTerm);
  const prevPage = useSelector((state) => state.search.page);

  const [searchTerm, setSearchTerm] = useState(prevSearchTerm);
  const [data, setData] = useState(useSelector((state) => state.search.data));
  const [page, setPage] = useState(useSelector((state) => state.search.page));
  const [total, setTotal] = useState(
    useSelector((state) => state.search.total)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (searchTerm !== prevSearchTerm || page !== prevPage) {
      const fetchData = async () => {
        setIsLoading(true);
        setIsError(false);

        const apiUrl = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchTerm}&page=${page}`;

        try {
          const res = await axios.get(apiUrl);
          setTotal(res.data.totalResults);
          setData(res.data.Search);

          dispatch(setStateData(res.data.Search));
          dispatch(setStateSearchTerm(searchTerm));
          dispatch(setStateTotal(res.data.totalResults));
          dispatch(setStatePage(page));

          setIsLoading(false);
        } catch (error) {
          setIsError(true);
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [dispatch, page, searchTerm, prevSearchTerm, prevPage]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    setPage(1);
    setTotal(null);
  };

  const totalPages = Math.ceil(total / 10);
  const startIndex = (page - 1) * 10 + 1;
  const endIndex = Math.min(startIndex + 9, total);

  const handlePrevPageClick = () => {
    setPage(Math.max(page - 1, 1));
    scrollTo();
  };

  const handleNextPageClick = () => {
    setPage(Math.min(page + 1, totalPages));
    scrollTo();
  };

  const scrollTo = (top = 0) => {
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const renderPager = () => {
    return (
      <Pager>
        <Button onClick={() => handlePrevPageClick()}>{t("prev_page")}</Button>
        <p className="pager-info">
          {`${t("page")} ${page} - ${startIndex}/${endIndex} ${t(
            "out_of"
          )} ${total}`}
        </p>
        <Button onClick={() => handleNextPageClick()}>{t("next_page")}</Button>
      </Pager>
    );
  };

  if (isError) {
    return <div>{t("error_fetching_data")}</div>;
  }

  return (
    <div>
      <StyledInput
        type="search"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={t("search_for_a_movie")}
      />

      {data && Object.keys(data).length > 0 ? (
        <>
          <StyledGrid>
            {data.map((d, i) => {
              return <MovieCard isLoading={isLoading} key={i} data={d} />;
            })}
          </StyledGrid>

          {renderPager()}
        </>
      ) : (
        <>
          <GridMobile>
            <StyledGrid>
              {Array.from({ length: 3 }, (_, index) => (
                <MovieCard key={index} />
              ))}
              <div className="overlay">
                {isLoading ? <Spin /> : t("no_movies_found_change_the_search")}
              </div>
            </StyledGrid>
          </GridMobile>
          <GridDesktop>
            <StyledGrid>
              {Array.from({ length: 9 }, (_, index) => (
                <MovieCard key={index} />
              ))}
              <div className="overlay">
                {isLoading ? <Spin /> : t("no_movies_found_change_the_search")}
              </div>
            </StyledGrid>
          </GridDesktop>
        </>
      )}
    </div>
  );
};

export const GridMobile = styled.div`
  display: block;

  @media ${device.m} {
    display: none;
  }
`;

export const GridDesktop = styled.div`
  display: none;

  @media ${device.m} {
    display: block;
  }
`;

const Pager = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  margin-top: 16px;
  font-size: ${rem(10)};
  color: ${(props) => props.theme.color.whiteTransparent75};

  .pager-info {
    display: none;
  }

  @media ${device.m} {
    margin-top: 32px;
    font-size: ${rem(14)};

    .pager-info {
      display: flex;
      color: ${(props) => props.theme.color.whiteTransparent75};
      opacity: 0.5;
    }
  }

  button {
    background-color: ${(props) => props.theme.color.overlay};
    border-color: ${(props) => props.theme.color.whiteTransparent75};
    color: ${(props) => props.theme.color.white};
  }
`;

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

  @media ${device.xl} {
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
