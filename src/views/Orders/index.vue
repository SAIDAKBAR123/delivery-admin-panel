<template>
  <div>
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
          <tr v-for="(item,i) in list" :key="item.guid + i">
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
  </div>
</template>

<script>
export default {
  props: ['desserts', 'getStatus', 'deleteOrder', 'status'],
  computed: {
    list () {
      if (this.status === 'all') return this.desserts
      return this.desserts.filter(el => el.status === this.status)
    }
  }

}
</script>

<style>

</style>
