import { Route, Routes } from "react-router-dom";
import Layout from "./containers/layout";
import NotFound from "./containers/notFound";
import { Suspense, lazy } from "react";

const Search = lazy(() => import("./containers/search"));
const Detail = lazy(() => import("./containers/detail"));
const Favorites = lazy(() => import("./containers/favorites"));

export default function App() {
  return (
    <Suspense fallback={<Layout />}>
      <Routes basename="/Movie-Lib">
        <Route path="/" element={<Layout />}>
          <Route index element={<Search />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
