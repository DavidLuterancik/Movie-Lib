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
    resources: {
      en: {
        translation: {
          browse: "Browse",
          favorites: "Favorites",
          search: "Search",
          not_found: "Oops, it looks like you're lost",
          back_home: "Back Home",
          change_lang: "Change Language",
          movie_details: "Movie Details",
          actors: "Actors",
          awards: "Awards",
          box_office: "Box Office",
          country: "Country",
          director: "Director",
          genre: "Genre",
          language: "Language",
          metascore: "Metascore",
          plot: "Plot",
          rated: "Rated",
          released: "Released",
          runtime: "Runtime",
          title: "Title",
          search_for_a_movie: "Search for a Movie",
          error_fetching_data: "Error fetching data",
          no_movie_data_available: "No movie data available",
          production: "Production",
          type: "Type",
          website: "Website",
          writer: "Writer",
          year: "Year",
          imdb_id: "IMDb ID",
          imdb_rating: "IMDb Rating",
          imdb_votes: "IMDb Votes",
          no_movies_found_change_the_search:
            "No movies found. Change the search",
          no_favorites_found_add_some: "No favorites found. Add some",
          show_info: "Show info",
          prev_page: "Previous Page",
          page: "Page",
          entries: "Entries",
          out_of: "out of",
          next_page: "Next Page",
          remove_favorite: "Remove from favorites"
        },
      },
      sk: {
        translation: {
          browse: "Prechádzať",
          favorites: "Obľúbené",
          search: "Vyhľadávanie",
          not_found: "Ooops, vyzerá to, že ste sa stratili",
          back_home: "Späť domov",
          change_lang: "Zmeniť jazyk",
          movie_details: "Podrobnosti o filme",
          actors: "Herci",
          awards: "Ocenenie",
          box_office: "Tržby",
          country: "Krajina",
          director: "Režisér",
          genre: "Žáner",
          language: "Jazyk",
          metascore: "Metaskóre",
          plot: "Zápletka",
          rated: "Ohodnotené",
          released: "Vydané",
          runtime: "Doba behu",
          title: "Titul",
          search_for_a_movie: "Vyhľadajte film",
          error_fetching_data: "Pri načítaní dát došlo k chybe",
          no_movie_data_available: "Nie sú k dispozícii žiadne dáta filmu",
          production: "Produkcia",
          type: "Typ",
          website: "Webová stránka",
          writer: "Scenár",
          year: "Rok",
          imdb_id: "IMDb ID",
          imdb_rating: "Hodnotenie na IMDb",
          imdb_votes: "Hlasy pre IMDb",
          no_movies_found_change_the_search: "Neboli nájdené žiadne filmy",
          no_favorites_found_add_some: "Neboli nájdené žiadne obľúbené filmy",
          show_info: "Zobraziť detaily",
          prev_page: "Predošlá stránka",
          page: "Stránka",
          entries: "Záznamy",
          out_of: "z",
          next_page: "Ďalšia stránka",
          remove_favorite: "Odstrániť z obľúbených"
        },
      },
    },
  });

export default i18n;
