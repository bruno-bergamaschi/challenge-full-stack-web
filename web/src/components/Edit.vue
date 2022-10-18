<template>
  <v-col cols="12">
    <v-row class="text-left">
      <v-col cols="12">
        <v-card class="mb-1 pa-4 grey darken-3 white--text text-center">
          Editar aluno
        </v-card>
        <v-card class="mb-5 pa-4" height="80vh">
          <v-form ref="form" class="mt-10" lazy-validation>
            <v-row justify="center" no-gutters>
              <v-col cols="12" md="8" align-self="center">
                <v-text-field
                  v-model="name"
                  :error-messages="nameErrors"
                  label="Nome"
                  required
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                  prepend-icon="mdi-account-box-outline"
                />
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  label="Email"
                  required
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                  prepend-icon="mdi-email-outline"
                />
                <v-text-field
                  v-model="ra"
                  label="RA"
                  disabled
                  prepend-icon="mdi-badge-account-outline"
                />
                <v-text-field
                  v-model="cpf"
                  label="CPF"
                  disabled
                  prepend-icon="mdi-card-account-details-outline"
                />

                <v-row align="center" justify="end" no-gutters>
                  <v-btn
                    text
                    color="grey darken-4"
                    class="mt-5 mr-5 pa-5"
                    @click="cancel"
                    >Cancelar</v-btn
                  >
                  <v-btn
                    class="green lighten-1 white--text mt-5 pa-5"
                    elevation="5"
                    :loading="loading"
                    @click="edit"
                  >
                    Editar
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
import navigate from "@/helpers/functions/navigate";
import api from "@/api";

export default {
  name: "Edit",
  mixins: [validationMixin],
  validations: {
    name: { required, minLength: minLength(4) },
    email: { required, email },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.minLength &&
        errors.push("O nome deve ter pelo menos 4 caracteres.");
      !this.$v.name.required && errors.push("O nome é obrigatório.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Deve ser um e-mail válido.");
      !this.$v.email.required && errors.push("O e-mail é obrigatório.");
      return errors;
    },
  },
  data() {
    return {
      id: "",
      name: "",
      email: "",
      ra: "",
      cpf: "",
      loading: false,
    };
  },
  created() {
    this.getStorage();
  },
  methods: {
    getStorage() {
      const student = JSON.parse(
        localStorage.getItem("@academic-module_student")
      );
      this.id = student.id;
      this.name = student.name;
      this.email = student.email;
      this.ra = student.ra;
      this.cpf = student.cpf;
    },
    async edit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.loading = true;
        const body = {
          name: this.name,
          email: this.email,
        };
        api
          .patch(`students/update/${this.id}`, body)
          .then((res) => {
            this.$toast.success(res.data.msg, {
              timeout: 3000,
            });

            navigate("listStudents");
          })
          .catch((error) => {
            this.$toast.error(error.response.data.error, {
              timeout: 5000,
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    cancel() {
      navigate("listStudents");
    },
  },
};
</script>
