<template>
  <v-col cols="12">
    <v-row class="text-left">
      <v-col cols="12">
        <v-card class="mb-1 pa-4 grey darken-3 white--text text-center">
          Cadastro de aluno
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
                  :error-messages="raErrors"
                  label="RA"
                  required
                  @input="$v.ra.$touch()"
                  @blur="$v.ra.$touch()"
                  prepend-icon="mdi-badge-account-outline"
                />
                <v-text-field
                  v-model="cpf"
                  :error-messages="cpfErrors"
                  label="CPF"
                  required
                  @input="$v.cpf.$touch()"
                  @blur="$v.cpf.$touch()"
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
                    @click="register"
                  >
                    Cadastrar
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
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
import api from "@/api";
import navigate from "@/helpers/functions/navigate";

const cpfValidator = helpers.regex(
  "cpfValidator",
  /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
);

export default {
  name: "Create",
  mixins: [validationMixin],
  validations: {
    name: { required, minLength: minLength(4) },
    email: { required, email },
    ra: { required, minLength: minLength(6) },
    cpf: { required, cpfValidator },
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
    raErrors() {
      const errors = [];
      if (!this.$v.ra.$dirty) return errors;
      !this.$v.ra.minLength &&
        errors.push("O RA deve ter pelo menos 6 caracteres.");
      !this.$v.ra.required && errors.push("O RA é obrigatório.");
      return errors;
    },
    cpfErrors() {
      const errors = [];
      if (!this.$v.cpf.$dirty) return errors;
      !this.$v.cpf.cpfValidator && errors.push("Deve ser um CPF válido.");
      !this.$v.cpf.required && errors.push("O CPF é obrigatório.");
      return errors;
    },
  },
  data() {
    return {
      name: "",
      email: "",
      ra: "",
      cpf: "",
      loading: false,
    };
  },
  methods: {
    async register() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        const body = {
          name: this.name,
          email: this.email,
          ra: this.ra,
          cpf: this.cpf,
        };
        api
          .post(`/students/create`, body)
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
