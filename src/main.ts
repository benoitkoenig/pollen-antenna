import { createApp } from "vue";

import "./style.css";
import App from "./App.vue";
import globalProvidersPlugin from "./global-providers/plugin";
import router from "./views/router";

createApp(App).use(globalProvidersPlugin).use(router).mount("#app");
