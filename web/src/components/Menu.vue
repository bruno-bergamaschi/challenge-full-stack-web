<template>
  <div>
    <v-app-bar color="grey darken-3 white--text" app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Módulo Acadêmico</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <Logo />
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list shaped>
        <v-list-item-group v-model="selectedItem" color="grey darken-3">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click="navigateTo(item.path)"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import navigate from "@/helpers/functions/navigate";
import Logo from "./Logo.vue";

export default {
  name: "MenuDrawer",
  comments: {
    Logo,
  },
  data: () => ({
    drawer: null,
    items: [
      { title: "Início", icon: "mdi-home", path: "home" },
      { title: "Alunos", icon: "mdi-account-group", path: "listStudents" },
    ],
  }),
  methods: {
    navigateTo(path) {
      navigate(path);
    },
  },
  components: { Logo },
};
</script>
