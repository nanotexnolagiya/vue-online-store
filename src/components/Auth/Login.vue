<template>
    <v-container fluid fill-height>
      <v-dialog
        hide-overlay
        v-model="loading"
        persistent
        width="300"
      >
        <v-card
          color="primary"
          dark
        >
          <v-card-text>
            Loading..
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Log In</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form 
                v-model="valid" 
                ref="form" 
                validation
              >
                <v-text-field 
                  prepend-icon="person" 
                  name="email" 
                  label="E-mail" 
                  type="email"
                  v-model="email"
                  :rules="emailRules"
                ></v-text-field>
                <v-text-field 
                  id="password" 
                  prepend-icon="lock" 
                  name="password" 
                  label="Password" 
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
              :disabled="!valid"
              @click="onSubmit"
              color="primary">Log In</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      </v-container>
</template>

<script>
  export default {
    data: () => ({
      valid: false,
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Min 6 characters'
      ]
    }),
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      getUser () {
        return this.$store.getters.user
      }
    },
    methods: {
      async onSubmit () {
        if (this.$refs.form.validate()) {
          try {
            await this.$store.dispatch('login', {
              email: this.email,
              password: this.password
            })
            this.$router.push('/')
          } catch (error) {
            throw error
          }
        }
      }
    },
    created () {
      if (this.$route.query['loginError']) {
        this.$store.dispatch('setError', {error: 'Please log in to access this page'})
      }
    }
  }
</script>
