<template>
  <v-container>
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
    <v-layout row>
      <v-flex xs12>
        <h1 class="text--secondary flow-text title text-uppercase mb-3">New Product</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-text-field
            name="title"
            label="Title"
            type="text"
            required
            :rules="[v => !!v || 'Title is required']"
            v-model="title"
          >
          </v-text-field>
          <v-text-field
            name="color"
            label="Color"
            type="text"
            v-model="color"
          >
          </v-text-field>
          <v-text-field
            name="price"
            label="Price"
            type="text"
            required
            :rules="[v => !!v || 'Price is required']"
            v-model="price"
          >
          </v-text-field>
          <v-textarea
            name="description"
            label="Description"
            v-model="description"
          ></v-textarea>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex
        xs12
      >
        <v-btn class="warning" @click="upload">
          Upload
          <v-icon right dark>cloud_upload</v-icon>
        </v-btn>
        <input 
          ref="fileInput" 
          type="file" 
          name="image" 
          accept="image/*"
          @change="onFile"
        >
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex
        xs12
      >
        <img :src="image" height="300px" v-if="img">
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex
        xs12
      >
        <v-switch
          color="primary"
          label="Add to promo?"
          v-model="promo"
        >
        </v-switch>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex
        xs12
      >
        <v-spacer></v-spacer>
        <v-btn 
          class="primary"
          @click="createProduct"
          :disabled="!valid || !img || loading"
        >
          <v-icon left dark>send</v-icon>
          Create Product
        </v-btn>
        <v-btn
          @click="clear"
        >
          Clear
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      title: '',
      color: '',
      price: '',
      description: '',
      promo: false,
      image: '',
      img: null
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    async createProduct () {
      if (this.$refs.form.validate() && this.img) {
        const product = {
          title: this.title,
          color: this.color,
          price: this.price,
          description: this.description,
          promo: this.promo,
          image: this.img
        }
        console.log('component', product)
        try {
          await this.$store.dispatch('createProduct', { product })
          this.$router.push('/products')
        } catch (error) {
        }
      }
    },
    upload () {
      this.$refs.fileInput.click()
    },
    onFile (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        this.image = reader.result
      }
      reader.readAsDataURL(file)
      this.img = file
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
  input[type="file"] {
    display: none;
  }
</style>

