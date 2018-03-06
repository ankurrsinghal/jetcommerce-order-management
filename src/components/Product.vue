<template>
  <el-card class="box-card product">
    <div slot="header" class="clearfix">
      <div class="product--name">{{ `${product.name} ${product.price}` }}</div>
      <el-button @click="$emit('actionClick')" style="float: right; padding: 3px 0" type="text">{{actionName}}</el-button>
    </div>
    <div class="text item product--description">
      {{ product.description }}
    </div>
  </el-card>
</template>

<script>
export default {
  props: ['product', 'actionName'],
  methods: {
    addToCart () {
      const { product } = this
      this.$store.commit('addItemToCart', { product })
    }
  }
}
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.product--name {
  float: left;
  font-weight: 900;
}
</style>
