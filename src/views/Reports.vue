<template>
  <div class="mx-2 my-2">
    <v-row class="my-2" justify="space-between" align="center">
      <v-col cols="auto">
        <h3>Reports</h3>
      </v-col>
    </v-row>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Order number</th>
            <th class="text-left">Address</th>
            <th class="text-left">Comments</th>
            <th class="text-left">Created at</th>
            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in desserts" :key="item.guid + i">
            <td>{{ i + 1 }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.comment }}</td>
            <td>{{ item.created_at | timeformatter }}</td>
            <td><v-chip text-color="orange" color="yellow lighten-4" class="rounded">
              {{
                getStatus(item.status)
              }}</v-chip></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import Orders from '../services/Orders'
import Users from '../services/Users'

export default {
  data () {
    return {
      dialog: false,
      desserts: [],
      products: [],
      users: [],
      merchantBranchList: [],
      form: {
        address: '',
        comment: '',
        product_id: '',
        delivery_type: 'delivery',
        payment_type: 'card',
        user_id: '',
        branch_id: '322656d6-97f9-4a7e-8270-e31aee2d76db'

      }
    }
  },
  methods: {
    getStatus (status) {
      switch (status) {
        case 'new':
          return 'New'
        case 'restaurant-proccess':
          return 'Restaurant process'
        case 'restaurant-ready':
          return 'Restaurant ready'
        case 'courier-accepted':
          return 'Courier accepted'
        case 'courier-delivered':
          return 'Courier delivered'
        default:
          return 'New'
      }
    },
    getUsers () {
      Users.getUsers().then(res => {
        console.log(res)
        this.users = res.users
      }).catch(err => {
        console.log(err)
      })
    },
    orderNow () {
      console.log(this.form)
      Orders.postOrder({
        address: this.form.address,
        comment: this.form.comment,
        product_id: this.form.product_id.map(el => el.id),
        user_id: this.form.user_id.guid,
        branch_id: this.form.branch_id.guid,
        delivery_type: 'delivery',
        payment_type: 'cash'
      }).then(res => {
        this.dialog = false
        console.log(res)
        // window.location.reload()
        this.form = {}
      }).catch(err => {
        console.log(err)
      })
    },
    getOrders () {
      Orders.getOrders().then(res => {
        console.log(res)
        this.desserts = res.orders
        // this.getProducts()
      })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>

<style></style>
