import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ProtectedAreasPage from "../pages/ProtectedAreasPage";
import SpeciesPage from "../pages/SpeciesPage";
import SpeciesDetailPage from "../pages/SpeciesDetailPage";
import AdminProtectedAreasPage from "../pages/AdminProtectedAreasPage";
import NewProtectedAreaPage from "../pages/NewProtectedAreaPage";
import EditProtectedAreaPage from "../pages/EditProtectedAreaPage";

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
        path="/admin/areas"
        element={<AdminProtectedAreasPage />}
        />

        <Route
        path="/admin/areas/new"
        element={<NewProtectedAreaPage />}
        />

      <Route
      path="/admin/areas/:id/edit"
      element={<EditProtectedAreaPage />}
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






