import { createApp } from "vue";

import "./style.css";
import App from "./App.vue";
import router from "./views/router";

createApp(App).use(router).mount("#app");
