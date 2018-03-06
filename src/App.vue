<template>
  <div id="main">
    <el-container>
      <el-header>
        <el-menu
          default-active="1"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">
            <router-link class="nav-links" :to="homeLink">JetCommerce</router-link>
          </el-menu-item>
          <template v-if="isAuthenticated">
            <el-menu-item index="2">
              <router-link class="nav-links" to="/orders">Your Orders</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <a @click.prevent="logout" class="nav-links" href="#">Logout</a>
            </el-menu-item>
          </template>
        </el-menu>
      </el-header>
      <el-main>
        <div class="content">
          <router-view></router-view>
        </div>
      </el-main>
      <el-footer>
        <p>Copyright JetCommerce 2018</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    homeLink () {
      if (this.isAuthenticated) {
        return '/'
      } else {
        return '/start'
      }
    }
  },
  name: 'App',
  created () {
    this.$store.dispatch('checkAuth')
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push('/start')
    }
  }
}
</script>

<style>
#main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav-links{
  display: block;
  text-decoration: none;
}

.content {
  padding: 1em;
}

.el-container {
  min-height: 100vh;
}
</style>
