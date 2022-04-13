<template>
  <div class="mx-2 my-2">
    <v-row class="my-2" justify="space-between" align="center">
      <v-col cols="auto">
        <h3>Courier Report</h3>
      </v-col>
    </v-row>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">№</th>
            <th class="text-left">Order ID</th>
            <th class="text-left">Merchant</th>
            <th class="text-left">Branch</th>
            <th class="text-left">Products cost</th>
            <th class="text-left">Delivery cost</th>
            <th class="text-left">Payment Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in desserts" :key="item.guid + i">
            <td>{{ i + 1 }}</td>
            <td>{{ item.guid.substring(0,6) }}</td>
            <td>{{ item.merchant_name }}</td>
            <td>{{ item.branch_name }}</td>
            <td>{{ item.product_cost }}</td>
            <td>{{ item.delivery_price }}</td>
            <td>{{ item.payment_type }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>

import Courier from '../../services/Courier'

export default {
  data () {
    return {
      dialog: false,
      desserts: [],
      products: [],
      users: [],
      merchantBranchList: []
    }
  },
  methods: {
    getProductCost (list = []) {
      if (!list) return 0
      return list.reduce((acc, curr) => {
        acc = acc + curr.price
        return acc
      }, 0)
    },
    getMerchantOrder () {
      Courier.getCourierOrders(this.$route.params.courierId).then(res => {
        console.log(res)
        this.desserts = res.orders.map(el => ({
          ...el,
          product_cost: this.getProductCost(el.products)
        }))
      })
    }
  },
  created () {
    this.getMerchantOrder()
  }
}
</script>

<style></style>
