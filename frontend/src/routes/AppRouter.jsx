import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ProtectedAreasPage from "../pages/ProtectedAreasPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/areas" element={<ProtectedAreasPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;



