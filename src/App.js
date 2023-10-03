import { Route, Routes } from "react-router-dom";
import Layout from "./containers/layout";
import Browse from "./containers/browse";
import Favorites from "./containers/favorites";
import Search from "./containers/search";
import NotFound from "./containers/notFound";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Browse />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
