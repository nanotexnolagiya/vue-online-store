<template>
  <v-container grid-list-lg>
    <v-layout row>
      <v-flex xs12>
        <h1 class="text--secondary flow-text title text-uppercase mb-3">Cart</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex
        xs12
      >
        <v-list
          subheader
          three-line
        >
          <v-list-tile 
            avatar
            v-for="order in orders"
            :key="order.id"
          >
            <v-list-tile-action>
              <v-checkbox
              color="primary"
              :input-value="order.done"
                @change="markDone(order)"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ order.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ order.phone }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn class="primary" :to="'/products/' + order.pruductId">More</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      notifications: false,
      orders: [
        {
          id: '1',
          name: 'Islomkhuja',
          phone: '804-22-19',
          pruductId: '1',
          done: false
        },
        {
          id: '2',
          name: 'Islomkhuja',
          phone: '804-22-19',
          pruductId: '2',
          done: false
        }
      ]
    }
  },
  methods: {
    markDone (order) {
      order.done = true
    }
  }
}
</script>
