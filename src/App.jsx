import { Routes, Route, Link } from "react-router-dom";

// Layout
import Layout from "./components/Layout";

import Home from "./pages/Home";
import MangaDetails from "./pages/MangaDetails";
import ReadManga from "./pages/ReadManga";
import SearchedManga from "./pages/SearchedManga";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/manga/:id?"
        element={
          <Layout>
            <MangaDetails />
          </Layout>
        }
      />
      <Route
        path="/manga/:id/:chapter?"
        element={
          <Layout>
            <ReadManga />
          </Layout>
        }
      />
      <Route
        path="/search/:searcheditem?"
        element={
          <Layout>
            <SearchedManga />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
