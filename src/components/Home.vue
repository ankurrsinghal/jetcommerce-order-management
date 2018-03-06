<template>
  <div>
    <div class="cart">
      <h2>Cart</h2>
      <div class="cart--items">
        <el-table
          v-loading="cartLoading"
          :fit="true"
          empty-text="Cart Empty"
          :data="cart"
          :row-style="{'text-align': 'left'}"
          style="width: 100%">
          <el-table-column
            label="Item Name">
            <template slot-scope="scope">
              <div class="table-item-name">
                {{ `${cart[scope.$index].name}` }}
              </div>
              <div class="table-item-description">
                {{ `${cart[scope.$index].description}` }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            label="Price">
          </el-table-column>
          <el-table-column
            label="Quantity">
            <template slot-scope="scope">
              <el-input-number size="mini" v-model="cart[scope.$index].quantity" :min="1" :max="4"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            label="Sub Total">
            <template slot-scope="scope">
              {{ `${cart[scope.$index].quantity * cart[scope.$index].price}` }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <hr />
      <div class="total">
        Total:- {{ total }}
      </div>
      <hr />
      <br/>
      <el-button @click="createOrder" type="primary" :disabled="cart.length === 0 || cartLoading">Create Order</el-button>
    </div>
    <br/>
    <br/>
    <br/>

    <div class="products">
      <h2>Products</h2>
      <div v-loading="productsLoading" class="product--list">
        <product
          v-for="product in products"
          :product="product"
          actionName="Add to Cart"
          @actionClick="addToCart(product)"
          :key="product._id">
        </product>
      </div>
    </div>

  </div>
</template>

<script>
import Product from './Product'
import { redirectToStart } from '../mixins'

export default {
  mixins: [redirectToStart],
  components: {
    Product
  },
  computed: {
    products () {
      return this.$store.getters.products
    },
    cart () {
      return this.$store.getters.cart
    },
    total () {
      let total = 0
      this.cart.forEach(p => {
        total += (p.quantity * p.price)
      })
      return total
    },
    cartLoading () {
      return this.$store.state.orderCreationStatus === 'requesting'
    },
    productsLoading () {
      return this.$store.state.productsLoadingStatus === 'requesting'
    }
  },
  mounted () {
    this.$store.dispatch('getProducts')
  },
  methods: {
    addToCart (product) {
      this.$store.commit('addItemToCart', { product })
    },
    removeFromCart (product) {
      this.$store.commit('removeItemFromCart', { product })
    },
    createOrder () {
      this.$store.dispatch('createOrder')
    }
  }
}
</script>

<style>
.product--list,
.cart--items{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.product{
  min-width: 300px;
  flex-basis: 30%;
  margin-bottom: 1.5em;
}

</style>
