import { memo } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Geolocation from "./views/geolocation";
import Graphs from "./views/graphs";
import Symptoms from "./views/symptoms";

import "./main.css";

const App = memo(function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/symptoms" replace />} />
        <Route path="/symptoms" element={<Symptoms />} />
        <Route path="/geolocation" element={<Geolocation />} />
        <Route path="/graphs" element={<Graphs />} />
      </Routes>
    </BrowserRouter>
  );
});

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
