<template>
  <v-container fluid>
    <v-row align-content="center">
      <Menu />
      <router-view />
    </v-row>
  </v-container>
</template>

<script>
import Menu from "@/components/Menu.vue";

export default {
  name: "Home",
  components: { Menu },
};
</script>
