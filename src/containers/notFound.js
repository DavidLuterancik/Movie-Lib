import { withTheme } from "@emotion/react";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";
import { MenuItem } from "./layout";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NotFound() {
  const { t } = useTranslation();

  return (
    <Center>
      <h1>{t("not_found")}</h1>

      <MenuItem to={"/"} className="link">
        <div className="icon">
          <FontAwesomeIcon icon={solid("home")} />
        </div>
        <div className="label">{t("back_home")}</div>
        <div className="underline" />
      </MenuItem>
    </Center>
  );
}

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  h1 {
    margin: 0 0 48px 0;
    padding: 0;
  }

  .link {
    width: 50%;
    height: 128px;
  }
`;

export default withTheme(NotFound);
