// PACKAGES
import React from "react";
import { Routes, Route } from "react-router-dom";

// CSS
import "./css/style.css";

// COMPONENTS
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
