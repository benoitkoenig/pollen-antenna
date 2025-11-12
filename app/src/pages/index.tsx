import { memo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Graphs from "./graphs";
import Header from "./header";
import Login from "./login";
import YourAnswer from "./your-answer";

export default memo(function Router() {
  return (
    <BrowserRouter>
      <Header />
      <div className="h-full max-w-2xl mx-auto">
        <Routes>
          <Route path="/" element={<YourAnswer />} />
          <Route path="/graphs" element={<Graphs />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
});
