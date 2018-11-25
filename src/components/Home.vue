<template>
    <div>
      <div v-if="loading" class="text-xs-center preloader pt-5 mt-5">
        <v-progress-circular
          :size="100"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <v-container v-else grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12>
              <h1 class="text--secondary flow-text title text-uppercase mb-3">Home</h1>
            </v-flex>
            <v-flex
              xs12
              sm6
              md4
              v-for="(product, i) in products"
              :key="i"
            >
              <v-card>
                <router-link
                  :aria-label="product.title"
                  :to="'/products/' + product.id"
                >
                  <v-img
                    :src="product.image"
                    height="250"
                  ></v-img>
                </router-link>

                <v-card-title primary-title>
                  <div class="car_content">
                    <h3 class="card_heading heading">{{ product.title }}</h3>
                    <div class="card_describe">
                      <p class="subheading">{{ product.description.substring(0, 60) }}</p>
                      <p class="subheading card_price">
                        <span class="title">Price: ${{ product.price }}</span>
                      </p>
                    </div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn dark color="light-blue darken-4" round outline :to="'/products/' + product.id">
                    <v-icon left>more_horiz</v-icon>
                    More
                  </v-btn>
                  <v-btn dark color="light-blue darken-4" round>
                    <v-icon left>shopping_cart</v-icon>
                    Cart
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
      </v-container>
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

<style scoped>
  .car_content {
    width: 100%;
  }
  .card_heading {
    font-weight: bold;
    word-wrap: break-word;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .card_describe {
    margin-top: auto;
    padding-left: 1.5rem;
  }

  .card_price {
    color: #b30000;
    font-size: 18px;
  }
</style>

