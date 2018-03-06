<template>
  <div v-loading="loading" class="sign-up">
    <el-form @submit="signUp" label-position="right" label-width="100px">
      <el-form-item label="Name">
        <el-input v-model="name" type="text"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="email" type="email"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="signUp" type="primary">Sign Up</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  computed: {
    loading () {
      return this.$store.state.signUpStatus === 'requesting'
    },
    success () {
      return this.$store.state.signUpStatus === 'success'
    },
    failed () {
      return this.$store.state.signUpStatus === 'failed'
    },
    errors () {
      return this.$store.state.signUpErrors
    }
  },
  watch: {
    failed () {
      if (this.failed) {
        let message = ``
        if (this.errors instanceof Array) {
          this.errors.map(e => {
            for (let key in e) {
              message += `${key} - ${e[key]}\n`
            }
          })
        }
        this.$message({
          message: message || 'Please check your entries.',
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
    signUp () {
      const { email, password, name } = this
      if (email.trim() === '' || password.trim() === '' || name.trim() === '') {
        this.$message({
          message: 'All entries are required',
          type: 'error'
        })
      }
      this.$store.dispatch('signUp', { email, password, name })
      if (this.success) {
        this.name = ''
        this.email = ''
        this.password = ''
      }
    }
  }
}
</script>

<style>

</style>
