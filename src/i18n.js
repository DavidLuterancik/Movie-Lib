import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18NextHttpBackend from "i18next-http-backend";

i18n
  //   .use(LanguageDetector)
  .use(I18NextHttpBackend)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
