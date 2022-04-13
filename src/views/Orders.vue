<template>
  <div class="mx-2 my-2">
    <v-row class="my-2" justify="space-between" align="center">
      <v-col cols="auto">
        <h3>Orders list</h3>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="dialog = true">Create</v-btn>
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
            <th class="text-left">Delivery type</th>
            <th class="text-left">Delivery price</th>
            <th class="text-left">Payment type</th>

            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in desserts" :key="item.product_id + i">
            <td>{{ i + 1 }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.comment }}</td>
            <td>{{ item.created_at | timeformatter }}</td>
            <td><v-chip text-color="orange" color="yellow lighten-4" class="rounded">
              {{
                getStatus(item.status)
              }}</v-chip></td>
              <td>{{ item.delivery_type }}</td>
              <td>{{ item.delivery_price }}</td>
              <td>{{ item.payment_type  }}</td>
            <td><v-btn class=" text-capitalize ml-2" @click="deleteOrder(item.guid)" outlined color="red" text fab small><v-icon>mdi-delete</v-icon></v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
     <v-row justify="center">
    <v-dialog width="450" v-model="dialog" persistent max-width="500">
      <template v-slot:activator="{  }">
      </template>
      <v-card width="500pxd">
        <v-card-title class="headline">Order create panel</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.address" label="Address" />
          <v-text-field v-model="form.comment" label="Comment"/>
           <v-select
            v-model="form.product_id"
            :hint="`You can select product you want to order`"
            :items="products"
            multiple
            item-text="name"
            item-value="guid"
            label="Select product"
            persistent-hint
            return-object
            single-line
          ></v-select>
          <v-select
              v-model="form.user_id"
              :hint="`Please, select use here`"
              :items="users"
              item-text="name"
              item-value="guid"
              label="Select user"
              persistent-hint
              return-object
              single-line
          ></v-select>
          <v-select
              v-model="form.branch_id"
              :hint="`Please, branch here`"
              :items="merchantBranchList"
              item-text="name"
              item-value="guid"
              label="Select Branch"
              persistent-hint
              return-object
              single-line
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">cancel</v-btn>
          <v-btn color="blue darken-1" dark @click="orderNow">Order now</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </div>
</template>

<script>
import Orders from '../services/Orders'
import Products from '../services/Products'
import Users from '../services/Users'
import MerchantBranch from '../services/MerchantBranch'

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
    getMerchanBranchList () {
      MerchantBranch.getMerchantBranchList().then(res => {
        console.log(res)
        this.merchantBranchList = res.merchant_branches
      })
    },
    deleteOrder (id) {
      console.log(id)
      Orders.deleteOrder({ guid: id }).then(res => {
        console.log(res)
        alert('deleted successfully')
        this.desserts = this.desserts.filter(el => el.id !== id)
        window.location.reload()
      }).catch(e => {
        alert('This products contains some orders; we cannot delete it')
      })
    },
    getProducts () {
      Products.getProducts().then(ress => {
        this.products = ress.products
      })
    },
    getOrders () {
      Orders.getOrders().then(res => {
        console.log(res)
        this.desserts = res.orders
        this.getProducts()
      })
    }
  },
  created () {
    this.getOrders()
    this.getUsers()
    this.getMerchanBranchList()
  }
}
</script>

<style></style>
