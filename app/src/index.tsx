import { memo } from "react";
import { createRoot } from "react-dom/client";
import { IntlProvider } from "react-intl";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ApolloWrapper from "apollo-wrapper";
import Graphs from "pages/graphs";
import YourAnswer from "pages/your-answer";
import { TodaysAnswerIdProvider } from "store/todays-answer-id";

import "./main.css";

const App = memo(function App() {
  return (
    <ApolloWrapper>
      <IntlProvider messages={{}} locale="en" defaultLocale="en">
        <BrowserRouter>
          <TodaysAnswerIdProvider>
            <Routes>
              <Route path="/" element={<YourAnswer />} />
              <Route path="/graphs" element={<Graphs />} />
            </Routes>
          </TodaysAnswerIdProvider>
        </BrowserRouter>
      </IntlProvider>
    </ApolloWrapper>
  );
});

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
