import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

function App() {
  return (
    <StyledMain>
      <StyledHeader>
        <StyledButton>
          <div className="icon">
            <FontAwesomeIcon icon={icon({ name: "list", style: "solid" })} />
          </div>
          <div className="label">Browse</div>
          <div className="underline"></div>
        </StyledButton>

        <StyledButton>
          <div className="icon">
            <FontAwesomeIcon icon={icon({ name: "star", style: "regular" })} />
          </div>
          <div className="label">Favourites</div>
          <div className="underline"></div>
        </StyledButton>

        <StyledButton>
          <div className="icon">
            <FontAwesomeIcon icon={icon({ name: "search", style: "solid" })} />
          </div>
          <div className="label">Search</div>
          <div className="underline"></div>
        </StyledButton>
      </StyledHeader>

      <StyledGrid>
        <div className="movie-card">EE</div>
        <div className="movie-card">EE</div>
        <div className="movie-card">EE</div>
        <div className="movie-card">EE</div>
        <div className="movie-card">EE</div>
        <div className="movie-card">EE</div>
      </StyledGrid>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  background-color: #141414;
  color: white;
  height: 100vh;
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  height: 64px;
  box-shadow: black 0px 0px 64px 0px;
  z-index: 10;
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  position: relative;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  font-size: 14px;
  .icon {
    transition: all 200ms ease-in-out;
    opacity: 0;
    padding-right: 0px;
  }

  .underline {
    transition: all 400ms ease-in-out;
    position: absolute;
    bottom: 0;
    display: flex;
    height: 1px;
    width: 0;
    background-color: rgba(255, 255, 255, 0.75);
  }

  &:hover {
    background: linear-gradient(90deg, rgba(14,14,14,0) 0%, rgba(255,255,255,0.05) 50%, rgba(14,14,14,0) 100%);
    text-shadow: rgba(255, 255, 255, 0.75) 0px 0px 16px;

    .icon {
      opacity: 1;
      padding-right: 8px;
    }

    .underline {
      width: 100%;
    }
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 4px;
  padding: 24px;

  .movie-card {
    display: flex;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.75);
    height: 256px;
    border-radius: 4px;
  }
`;

export default App;
