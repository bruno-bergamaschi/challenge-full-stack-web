import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.config.productionTip = false;

Vue.use(Toast);

let students = [];

new Vue({
  router,
  vuetify,
  Vuelidate,
  data: {
    students,
  },
  render: (h) => h(App),
}).$mount("#app");
