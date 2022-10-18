import Vue from "vue";
import VueRouter from "vue-router";
import ListStudents from "../components/ListStudents.vue";
import Home from "@/components/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/alunos",
    name: "listStudents",
    component: ListStudents,
  },
  {
    path: "/cadastrar",
    name: "createStudents",
    component: () => import("../components/Create.vue"),
  },
  {
    path: "/editar",
    name: "editStudents",
    component: () => import("../components/Edit.vue"),
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
