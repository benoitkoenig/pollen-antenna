import type { Plugin } from "vue";

import { anonymousData, anonymousDataKey } from "./AnonymousData";
import { profileData, profileDataKey } from "./ProfileData";

const globalProvidersPlugin: Plugin = {
  install: (app) => {
    app
      .provide(anonymousDataKey, anonymousData)
      .provide(profileDataKey, profileData);
  },
};

export default globalProvidersPlugin;
