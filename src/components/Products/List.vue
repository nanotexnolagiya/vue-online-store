<template>
  <v-container v-if="!loading">
    <v-layout row>
      <v-flex 
        xs12
        sm8
        offset-sm2
      >
        <h1 class="text--secondary flow-text title text-uppercase mb-3">Products</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex
        xs12
        sm8
        offset-sm2
      >
        <v-card 
          class="elevation-10 mb-3"
          v-for="product in products"
          :key="product.id"
        >
          <v-layout>
            <v-flex
              xs4
            >
              <v-img
                :src="product.image"
                height="200"
              ></v-img>
            </v-flex>
            <v-flex
              xs8
            >
              <v-card-text>
                <h2 class="text--primary">{{ product.title }}</h2>
                <p>{{ product.description }}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="primary" :to="'/products/' + product.id">More</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

  <div v-else class="text-xs-center preloader pt-5 mt-5">
    <v-progress-circular
      :size="100"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  computed: {
    products () {
      return this.$store.getters.getProducts
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
