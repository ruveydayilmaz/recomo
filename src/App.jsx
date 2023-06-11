import React from "react";
import { Routes, Route } from "react-router-dom";

import "./css/style.css";

import Landing from "./pages/Landing";
import Card from "./pages/Card";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/card/:name" element={<Card />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
