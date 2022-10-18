<template>
  <v-col cols="12">
    <v-row class="text-left">
      <v-col cols="12">
        <v-card class="mb-1 pa-4 grey darken-3 white--text text-center">
          Consulta de alunos
        </v-card>

        <v-row class="text-left" justify="end">
          <v-btn
            class="green lighten-1 white--text ma-3 mt-5 pa-5"
            elevation="5"
            @click="goCreate"
            >Cadastrar aluno</v-btn
          >
        </v-row>
        <v-card class="mt-5">
          <v-simple-table height="72.8vh">
            <thead>
              <tr>
                <th class="text-center">Registro Acadêmico</th>
                <th class="text-center">Nome</th>
                <th class="text-center">CPF</th>
                <th class="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="student in this.$root.$data.students"
                :key="student.id"
              >
                <td class="text-center">{{ student.ra }}</td>
                <td class="text-center">{{ student.name }}</td>
                <td class="text-center">{{ student.cpf }}</td>
                <td class="text-center">
                  <v-row class="text-center py-2" justify="center">
                    <v-btn text color="grey darken-4" @click="goEdit(student)"
                      >Editar</v-btn
                    >
                    <Delete :student="student" />
                  </v-row>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import Delete from "./Delete.vue";
import navigate from "@/helpers/functions/navigate";
import api from "../api";

export default {
  name: "ListStudents",
  components: {
    Delete,
  },
  data() {
    return {
      dialog: false,
    };
  },
  created() {
    this.getStudents();
  },
  methods: {
    getStudents() {
      api
        .get(`/students/get-all`)
        .then((res) => {
          this.$root.$data.students = res.data;
        })
        .catch((error) => {
          this.$toast.error(error.response.data.error, {
            timeout: 5000,
          });
        });
    },
    goCreate() {
      navigate("createStudents");
    },
    goEdit(student) {
      localStorage.setItem("@academic-module_student", JSON.stringify(student));
      navigate("editStudents");
    },
  },
};
</script>
