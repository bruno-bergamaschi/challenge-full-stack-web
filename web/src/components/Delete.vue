<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="red lighten-2" dark v-bind="attrs" v-on="on">
          Excluir
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ student.name }}
        </v-card-title>

        <v-card-text class="pa-10">
          <h3>Confirmar exclusão de cadastro?</h3>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn color="grey darken-4" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="error" @click="deleteStudent" :loading="loading">
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from "../api";

export default {
  name: "Delete",
  props: {
    student: Object,
  },
  data() {
    return {
      dialog: false,
      loading: false,
    };
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
    deleteStudent() {
      this.loading = true;
      api
        .delete(`/students/delete/${this.student.id}`)
        .then((res) => {
          this.$toast.success(res.data.msg, {
            timeout: 3000,
          });

          this.getStudents();
          this.dialog = false;
        })
        .catch((error) => {
          this.$toast.error(error.response.data.error, {
            timeout: 5000,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
