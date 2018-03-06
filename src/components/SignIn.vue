<template>
  <div v-loading="loading" class="sign-in">
    <el-form @submit="signIn" label-position="right" label-width="100px">
      <el-form-item label="Email">
        <el-input v-model="email" type="email"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="signIn" type="primary">Sign In</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    loading () {
      return this.$store.state.signInStatus === 'requesting'
    },
    success () {
      return this.$store.state.signInStatus === 'success'
    },
    failed () {
      return this.$store.state.signInStatus === 'failed'
    }
  },
  watch: {
    failed () {
      if (this.failed) {
        this.$message({
          message: 'Invalid Email/Password.',
          type: 'error'
        })
        this.$store.commit('signInStatus', { status: 'freeze' })
      }
    },
    success () {
      if (this.success) {
        this.$router.replace('/')
      }
    }
  },
  methods: {
    signIn () {
      const { email, password } = this
      if (email.trim() === '' || password.trim() === '') {
        return
      }
      this.$store.dispatch('signIn', { email, password })
    }
  }
}
</script>

<style>
.el-message__content {
  font-family: 'Avenir', 'Helvetica', sans-serif;
}
</style>
