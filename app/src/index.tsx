import { GoogleOAuthProvider } from "@react-oauth/google";
import { memo } from "react";
import { createRoot } from "react-dom/client";
import { IntlProvider } from "react-intl";

import ApolloWrapper from "apollo-wrapper";
import Router from "pages/router";
import { AuthenticationProvider } from "store/authentication";
import { TodaysAnswerIdProvider } from "store/todays-answer-id";

import "./main.css";

const App = memo(function App() {
  return (
    <GoogleOAuthProvider
      clientId={import.meta.env["VITE_GOOGLE_OAUTH_CLIENT_ID"]}
    >
      <AuthenticationProvider>
        <TodaysAnswerIdProvider>
          <ApolloWrapper>
            <IntlProvider messages={{}} locale="en" defaultLocale="en">
              <Router />
            </IntlProvider>
          </ApolloWrapper>
        </TodaysAnswerIdProvider>
      </AuthenticationProvider>
    </GoogleOAuthProvider>
  );
});

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
