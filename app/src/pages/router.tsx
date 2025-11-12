import { memo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Graphs from "./graphs";
import YourAnswer from "./your-answer";

export default memo(function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<YourAnswer />} />
        <Route path="/graphs" element={<Graphs />} />
      </Routes>
    </BrowserRouter>
  );
});
