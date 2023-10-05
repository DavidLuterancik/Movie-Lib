import { Route, Routes } from "react-router-dom";
import Layout from "./containers/layout";
import Favorites from "./containers/favorites";
import Search from "./containers/search";
import NotFound from "./containers/notFound";
import Detail from "./containers/detail";

export default function App() {
  return (
    <>
      <Routes basename="/Movie-Lib">
        <Route path="/" element={<Layout />}>
          <Route index element={<Search />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
