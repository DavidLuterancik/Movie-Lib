import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeProvider, styled } from "styled-components";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Popup from "../components/popup/popup";
import theme from "../themes/baseTheme";
import Tooltip from "../components/tooltip/tooltip";
import axios from "axios";
import { useQuery } from "react-query";

const languageSwitcher = {
  en: { nativeName: "English" },
  sk: { nativeName: "Slovensky" },
  cs: { nativeName: "Česky" },
};

const menuItems = [
  {
    to: "/",
    icon: <FontAwesomeIcon icon={icon({ name: "list", style: "solid" })} />,
    label: "browse",
  },
  {
    to: "/favorites",
    icon: <FontAwesomeIcon icon={icon({ name: "star", style: "regular" })} />,
    label: "favorites",
  },
  {
    to: "/search",
    icon: <FontAwesomeIcon icon={icon({ name: "search", style: "solid" })} />,
    label: "search",
  },
];

export default function Layout() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [showLangPopup, setShowLangPopup] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <StyledMain>
        <Popup
          title={t("change_lang")}
          show={showLangPopup}
          onClose={() => setShowLangPopup(false)}
        >
          <LangSwitchModal>
            {Object.keys(languageSwitcher).map((lang) => (
              <LangSwitchLang
                key={lang}
                current={i18n.resolvedLanguage === lang}
                onClick={() => {
                  i18n.changeLanguage(lang);
                  setShowLangPopup(false);
                }}
              >
                {languageSwitcher[lang].nativeName}
              </LangSwitchLang>
            ))}
          </LangSwitchModal>
        </Popup>

        <Header>
          <Nav>
            {menuItems.map((m) => {
              return (
                <MenuItem to={m.to} current={location?.pathname === m.to}>
                  <div className="icon">{m.icon}</div>
                  <div className="label">{t(m.label)}</div>
                  <div className="underline" />
                </MenuItem>
              );
            })}
          </Nav>
          <Tooltip noMargin content={t("change_lang")}>
            <LangSwitchButton onClick={() => setShowLangPopup(true)}>
              <FontAwesomeIcon
                size={"xl"}
                icon={icon({ name: "language", style: "solid" })}
              />
            </LangSwitchButton>
          </Tooltip>
        </Header>

        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </StyledMain>
    </ThemeProvider>
  );
}

const StyledMain = styled.main`
  background-color: ${(props) => props.theme.color.background};
  color: ${(props) => props.theme.color.white};
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const LangSwitchButton = styled.button`
  background: initial;
  border: none;
  padding: 0;
  margin: 0;
  outline: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  box-shadow: black 0px 0px 64px 0px;
  color: ${(props) => props.theme.color.whiteTransparent75};
  transition: all 200ms ease-in-out;

  &:hover {
    color: ${(props) => props.theme.color.white};
  }
`;

const LangSwitchModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const LangSwitchLang = styled.button`
  background: initial;
  border: none;
  padding: 0;
  margin: 0;
  outline: none;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  height: 100%;

  transition: all 200ms ease-in-out;
  font-size: ${(props) => (props.current ? "18px" : "14px")};
  color: ${(props) =>
    props.current
      ? props.theme.color.white
      : props.theme.color.whiteTransparent75};

  font-weight: ${(props) => props.current && "bold"};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-shadow: rgba(255, 255, 255, 0.75) 0px 0px 16px;
    color: ${(props) => props.theme.color.white};
    font-size: 18px;
  }
`;

const OutletWrapper = styled.div`
  padding: 48px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  width: calc(100% - 64px);
  justify-content: space-between;
  height: 64px;
  box-shadow: black 0px 0px 64px 0px;
`;

export const MenuItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  position: relative;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  font-size: 14px;
  color: ${(props) =>
    props.current
      ? props.theme.color.white
      : props.theme.color.whiteTransparent75};

  font-weight: ${(props) => props.current && "bold"};
  text-decoration: none;

  .icon {
    transition: all 200ms ease-in-out;
    opacity: 0;
    padding-right: 0px;
  }

  .label {
    text-transform: capitalize;
  }

  .underline {
    transition: all 400ms ease-in-out;
    position: absolute;
    bottom: 0;
    display: flex;
    height: 1px;
    width: 0;
    background-color: ${(props) => props.theme.color.whiteTransparent75};
  }

  &:hover {
    background: linear-gradient(
      90deg,
      rgba(14, 14, 14, 0) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(14, 14, 14, 0) 100%
    );
    text-shadow: rgba(255, 255, 255, 0.75) 0px 0px 16px;
    color: ${(props) => props.theme.color.white};

    .icon {
      opacity: 1;
      padding-right: 8px;
    }

    .underline {
      width: 100%;
    }
  }
`;
