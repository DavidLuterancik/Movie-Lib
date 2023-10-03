import { withTheme } from "@emotion/react";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { rem } from "polished";
import { useEffect, useRef } from "react";
import { styled } from "styled-components";

const Popup = ({ show, onClose, children, title }) => {
  const handleCloseClick = (e) => {
    if (e) {
      e.preventDefault();
    }
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <StyledModalOverlay>
      <OutsideAlerter onClick={handleCloseClick}>
        <StyledModal>
          <StyledModalHeader>
            <StyledModalTitle>{title}</StyledModalTitle>

            <CloseIcon onClick={handleCloseClick}>
              <FontAwesomeIcon icon={solid("xmark")} />
            </CloseIcon>
          </StyledModalHeader>

          <StyledModalBody>{children}</StyledModalBody>
        </StyledModal>
      </OutsideAlerter>
    </StyledModalOverlay>
  );
};

function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.onClick);

  return <div ref={wrapperRef}>{props.children}</div>;
}

function useOutsideAlerter(ref, func) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        func();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

const StyledModalTitle = styled.div`
  color: ${(props) => props.theme.color.primaryTextWhite};
  text-transform: capitalize;
`;

const StyledModalBody = styled.div`
  width: 50vw;
  height: 50vh;
  cursor: default;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${rem(18)};
  font-weight: bold;
  padding: ${rem(24)};
`;

const StyledModal = styled.div`
  background: ${(props) => props.theme.color.backgroundLite};
  border-radius: ${rem(8)};
`;

const StyledModalOverlay = styled.div`
  overflow: hidden;
  padding: ${rem(24)};
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: flex-start;
  background-color: ${(props) => props.theme.color.overlay};

  z-index: 9999;
  overflow: auto;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const CloseIcon = styled.div`
  cursor: pointer;
`

export default withTheme(Popup);
