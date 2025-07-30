import { Routes, Route, Link } from "react-router-dom";

// Layout
import Layout from "./components/Layout";

import Home from "./pages/Home";

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
      </Routes>
    </div>
  );
}

export default App;
