import { GoogleOAuthProvider } from "@react-oauth/google";
import { memo } from "react";
import { createRoot } from "react-dom/client";
import { IntlProvider } from "react-intl";

import ApolloWrapper from "apollo-wrapper";
import { AuthenticationProvider } from "global-providers/authentication";
import { GeolocationProvider } from "global-providers/geolocation";
import { TodaysAnswerIdProvider } from "global-providers/todays-answer-id";
import Pages from "pages";

import "./main.css";

const App = memo(function App() {
  return (
    <GoogleOAuthProvider
      clientId={import.meta.env["VITE_GOOGLE_OAUTH_CLIENT_ID"]}
    >
      <AuthenticationProvider>
        <TodaysAnswerIdProvider>
          <GeolocationProvider>
            <ApolloWrapper>
              <IntlProvider messages={{}} locale="en" defaultLocale="en">
                <Pages />
              </IntlProvider>
            </ApolloWrapper>
          </GeolocationProvider>
        </TodaysAnswerIdProvider>
      </AuthenticationProvider>
    </GoogleOAuthProvider>
  );
});

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
