import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ProtectedAreasPage from "../pages/ProtectedAreasPage";
import SpeciesPage from "../pages/SpeciesPage";
import SpeciesDetailPage from "../pages/SpeciesDetailPage";

function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/areas"
          element={<ProtectedAreasPage />}
        />

        <Route
          path="/areas/:id"
          element={<SpeciesPage />}
        />

        <Route
          path="/species/:id"
          element={<SpeciesDetailPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRouter;






