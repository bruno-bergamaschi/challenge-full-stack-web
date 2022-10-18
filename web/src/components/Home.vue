<template>
  <v-col cols="12">
    <v-row class="text-left">
      <v-col cols="12">
        <v-card class="mb-1 pa-4 grey darken-3 white--text text-center">
          Início
        </v-card>
        <v-card class="mb-5 pa-4" height="80vh">
          <v-row class="text-center" align-content="center" justify="center">
            <v-col class="pa-10">
              <h1 class="mb-10 mt-10">Bem-vindo!</h1>
              <h4 class="text-center">
                Para visualizar, cadastrar, editar e excluir alunos, acesse a
                opção Alunos no menu.
              </h4>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
};
</script>
