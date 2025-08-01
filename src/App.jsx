import { Routes, Route, Link } from "react-router-dom";

// Layout
import Layout from "./components/Layout";

import Home from "./pages/Home";
import MangaDetails from "./pages/MangaDetails";

function App() {
  return (
    <div>
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
      </Routes>
    </div>
  );
}

export default App;
