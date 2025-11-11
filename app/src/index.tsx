import { GoogleOAuthProvider } from "@react-oauth/google";
import { memo } from "react";
import { createRoot } from "react-dom/client";
import { IntlProvider } from "react-intl";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ApolloWrapper from "apollo-wrapper";
import Graphs from "pages/graphs";
import YourAnswer from "pages/your-answer";

import "./main.css";

const App = memo(function App() {
  return (
    <GoogleOAuthProvider
      clientId={import.meta.env["VITE_GOOGLE_OAUTH_CLIENT_ID"]}
    >
      <ApolloWrapper>
        <IntlProvider messages={{}} locale="en" defaultLocale="en">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<YourAnswer />} />
              <Route path="/graphs" element={<Graphs />} />
            </Routes>
          </BrowserRouter>
        </IntlProvider>
      </ApolloWrapper>
    </GoogleOAuthProvider>
  );
});

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
