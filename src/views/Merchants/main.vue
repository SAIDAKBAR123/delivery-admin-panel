<template>
  <div>
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab :key="2343">
         Merchant branches
      </v-tab>
      <v-tab :key="5544">
          Categories
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item :key="2343" class="mb-5">
          <MerchantBranches />
      </v-tab-item>
      <v-tab-item :key="5544" class="mb-5">
          <Cateogory />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import MerchantBranches from './MerchantBranches.vue'
import Cateogory from '../Categories.vue'
export default {
  components: {
    MerchantBranches,
    Cateogory
  },
  watch: {
    tab (e) {
      this.$router.replace({ query: { tab: e } }).catch(e => {})
    }
  },
  created () {
    this.tab = parseInt(this.$route.query.tab || 0)
  },
  data () {
    return {
      tab: 1
    }
  }
}
</script>

<style>
</style>
