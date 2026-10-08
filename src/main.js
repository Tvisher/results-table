import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.scss";
import PrimeVue from "primevue/config";
createApp(App).use(router).use(PrimeVue, {}).mount("#app");
