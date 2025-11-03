import { memo } from "react";
import { createRoot } from "react-dom/client";

import "./main.css";

const App = memo(function App() {
  return <div>Hello world!</div>;
});

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
