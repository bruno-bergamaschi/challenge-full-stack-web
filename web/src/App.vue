<template>
  <v-app>
    <v-main>
      <HomeView />
    </v-main>
  </v-app>
</template>

<script>
import HomeView from "./views/HomeView.vue";
import Logo from "./components/Logo.vue";
export default {
  name: "App",
  components: {
    Logo,
    HomeView,
  },
  data: () => ({
    //
  }),
};
</script>
