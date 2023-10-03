import { withTheme } from "@emotion/react";
import { styled } from "styled-components";

const Browse = (props) => {
  return (
    <StyledGrid>
      <div className="movie-card">EE</div>
      <div className="movie-card">EE</div>
      <div className="movie-card">EE</div>
      <div className="movie-card">EE</div>
      <div className="movie-card">EE</div>
      <div className="movie-card">EE</div>
    </StyledGrid>
  );
};

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 8px;

  .movie-card {
    display: flex;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.75);
    height: 256px;
    border-radius: 4px;

    &:hover {
      transition: all 400ms ease;
      background-color: rgba(255, 255, 255, 1);
      box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 16px 0px;
    }
  }
`;

export default withTheme(Browse);
