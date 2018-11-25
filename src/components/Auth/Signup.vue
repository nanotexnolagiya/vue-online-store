<template>
    <v-container fluid fill-height>
      <v-dialog
        hide-overlay
        v-model="loading"
        persistent
        width="300"
      >
        <v-card
          color="error"
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
              <v-toolbar-title>Sign Up</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form 
                v-model="valid"
                ref="form" 
                :lazy-validation="valid"
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
                <v-text-field 
                  id="cpassword" 
                  prepend-icon="lock" 
                  name="cpassword" 
                  label="Confirm Password" 
                  type="password"
                  v-model="cpassword"
                  :rules="cPasswordRules"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                :disabled="!valid || loading"
                @click="onSubmit"
                color="primary"
              >Sign Up
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      </v-container>
</template>

<script>
  export default {
    data () {
      return {
        valid: false,
        email: '',
        password: '',
        cpassword: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length > 6 || 'Min 6 characters'
        ],
        cPasswordRules: [
          v => !!v || 'Confirm Password is required',
          v => v === this.password || 'Password should match'
        ]
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      async onSubmit () {
        let user = {
          email: this.email,
          password: this.password
        }
        if (this.$refs.form.validate()) {
          this.$store.dispatch('setLoading', {loading: true})
          try {
            await this.$store.dispatch('signup', user)
            this.$store.dispatch('setLoading', {loading: false})
            this.$router.push('/')
          } catch (error) {
            console.log(error)
            this.$store.dispatch('setLoading', {loading: false})
            throw error
          }
        }
      }
    }
  }
</script>
