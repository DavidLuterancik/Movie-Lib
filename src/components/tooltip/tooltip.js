import { withTheme } from "@emotion/react";
import { rem } from "polished";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import Tippy from "@tippyjs/react";
import styled from "styled-components";

const Tooltip = (props) => {
  if (!props.content)
    return <Wrapper noMargin={props.noMargin}>{props.children}</Wrapper>;

  return (
    <Wrapper noMargin={props.noMargin}>
      <StyledTippy
        content={props.content}
        duration={[200]}
        animation={"shift-away"}
        arrow={true}
        placement={props.placement}
        interactive={true}
      >
        {props.children}
      </StyledTippy>
    </Wrapper>
  );
};

export const StyledTippy = styled(Tippy)`
  .tippy-content {
    background: ${(props) =>
      props.backgroundColor || props.theme.color.primaryTextColor};
    color: #fff;
    text-align: center;
    padding: ${rem(8)} ${rem(12)};
    border-radius: ${rem(4)};
    font-size: ${rem(14)};

    .stock-tooltip {
      line-height: ${rem(18)};
    }
  }
`;

const Wrapper = styled.div`
  margin-right: ${(props) => !props.noMargin && rem(4)};
  margin-left: ${(props) => !props.noMargin && rem(4)};

  .tooltip {
    position: relative;
    display: inline-block;
    width: ${rem(16)};
    height: ${rem(16)};
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
    display: none;
    background-color: ${(props) => props.theme.color.primaryTextColor};
    width: ${(props) => (props.width ? rem(props.width) : "auto")};
    /* width: ${rem(420)}; */
    color: #fff;
    text-align: center;
    padding: ${rem(8)} ${rem(8)};
    border-radius: ${rem(24)};
    font-size: ${rem(12)};

    /* right: ${(props) => `calc(50% - ${props.width / 2}px)`};
     */
    left: ${rem(16)};
    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
    top: -106px;
    left: -119px;
    @media (min-width: ${(props) => rem(props.theme.sizes.m)}) {
      top: -36px;
      left: ${rem(16)};
    }
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:hover .tooltiptext {
    display: block;
  }
`;

Tooltip.defaultProps = {
  width: null,
  content: null,
  children: null,
  placement: "top",
};

export default withTheme(Tooltip);
