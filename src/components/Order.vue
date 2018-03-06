<template>
  <div class="orders" v-loading="loading">
    <div
      class="order"
      v-for="order in orders"
      :key="order._id">
      <h1>Order #{{order._id}}</h1>
      <el-table
        :fit="true"
        empty-text="No orders"
        :data="order.items"
        :row-style="{'text-align': 'left'}"
        style="width: 100%">
        <el-table-column
          label="Item Name">
          <template slot-scope="scope">
            <div class="table-item-name">
              {{ `${order.items[scope.$index].product.name}` }}
            </div>
            <div class="table-item-description">
              {{ `${order.items[scope.$index].product.name}` }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Price">
          <template slot-scope="scope">
            <div class="table-item-price">
              {{ `${order.items[scope.$index].product.price}` }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Quantity">
          <template slot-scope="scope">
            <div class="table-item-qty">{{ order.items[scope.$index].quantity }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="Sub Total">
          <template slot-scope="scope">
            {{ `${order.items[scope.$index].quantity * order.items[scope.$index].product.price}` }}
          </template>
        </el-table-column>
      </el-table>
      <hr />
      <div class="total">
        Total:- {{ total(order) }}
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import { redirectToStart } from '../mixins'

export default {
  mixins: [redirectToStart],
  computed: {
    orders () {
      return this.$store.getters.orders
    },
    loading () {
      return this.$store.state.orderLoadingStatus === 'requesting'
    }
  },
  mounted () {
    this.$store.dispatch('getOrders')
  },
  methods: {
    total (order) {
      let total = 0
      order.items.forEach(({ quantity, product }) => {
        total += (quantity * product.price)
      })
      return total
    }
  }
}
</script>

<style>
.order{
  padding: 1em;
  margin: 1em;
}
</style>
