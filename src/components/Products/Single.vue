<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <h1 class="text--secondary flow-text title text-uppercase mb-3">product single</h1>
      </v-flex>
    </v-layout>
    <section class="product mt-3 elevation-10">
      <v-layout row wrap>
        <v-flex xs12 lg6 v-if="product.image.length > 0">
          <img class="product_image" :src="product.image">
        </v-flex>
        <v-flex xs12 lg6>
          <div class="product_info">
            <h5 class="product_title display-1 mb-3 mt-3">{{ product.title }}</h5>
            <p class="product_price title">
              <span class="product_title">Price: </span>${{ product.price }}
            </p>
            <p class="product_color title">
              <span class="product_title">Color: </span>
              <span :style="{ backgroundColor: product.color }" class="product_color_bg"></span>
            </p>
            <div class="title mb-5">
              <p class="product_title">Description: </p> {{ product.description }}
            </div>
            <v-btn color="primary" class="headline">Edit</v-btn>
            <v-btn color="primary" class="headline">Buy</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </section>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    product () {
      return this.$store.getters.productById(this.id)
    }
  }
}
</script>

<style scoped>
  .product {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border: 1px solid #1c77ad;
    padding: 30px;
    margin-bottom: 100px;
  }
  .product_image {
    width: 550px;
  }
  .product_info {
    margin-left: 50px;
  }
  .product_title {
    font-size: 1.6rem;
    font-weight: bold;
    color: #1875d0;
    margin-bottom: 0;
  }
  .product_price {
    color: #b30000;
  }
  .product_color_bg {
    display: inline-block;
    width: 50px;
    height: 20px;
    border: 1px solid #2b2b2b;
    border-radius: 10px;
  }
</style>

