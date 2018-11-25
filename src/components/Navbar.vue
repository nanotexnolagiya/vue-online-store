<template>
    <div>
        <v-navigation-drawer app temporary v-model="sideNav">
          <v-list>
            <v-list-tile
              v-for="link in links"
              :key="link.title"
              avatar
              :to="link.path"
            >
              <v-list-tile-action>
                <v-icon color="primary">{{ link.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title v-text="link.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              @click="onLogout"
              v-if="isUserLogIn"
              avatar
            >
              <v-list-tile-action>
                <v-icon color="primary">exit_to_app</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title v-text="'Logout'"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
        <v-toolbar app dark color="primary">
            <v-toolbar-side-icon 
              class="hidden-md-and-up" 
              @click="sideNav = !sideNav"
            ></v-toolbar-side-icon>
            <v-toolbar-title>
              <router-link tag="span" to="/" class="pointer">Online Store</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn 
                  flat
                  v-for="link in links"
                  :key="link.title"
                  :to="link.path"
                >
                    <v-icon left>{{ link.icon }}</v-icon>
                    {{ link.title }}
                </v-btn>
                <v-btn
                  flat
                  @click="onLogout"
                  v-if="isUserLogIn"
                >
                  <v-icon left>exit_to_app</v-icon>
                  Logout
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <router-view></router-view>
        </v-content>
        <v-footer app></v-footer>
    </div>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  },
  computed: {
    isUserLogIn () {
      return this.$store.getters.isUserLogIn
    },
    links () {
      if (this.isUserLogIn) {
        return [
          { title: 'Cart', path: '/cart', icon: 'shopping_cart' },
          { title: 'New Product', path: '/products/new', icon: 'add' },
          { title: 'My Products', path: '/products', icon: 'list' }
        ]
      } else {
        return [
          { title: 'Log In', path: '/login', icon: 'account_box' },
          { title: 'Sign Up', path: '/signup', icon: 'face' }
        ]
      }
    }
  }
}
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
