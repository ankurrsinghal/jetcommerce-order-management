<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="Sign In" name="signIn">
      <sign-in></sign-in>
    </el-tab-pane>
    <el-tab-pane label="Sign Up" name="signUp">
      <sign-up></sign-up>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import SignIn from './SignIn'
import SignUp from './SignUp'
import { redirectToHome } from '../mixins'

export default {
  mixins: [redirectToHome],
  components: {
    SignIn,
    SignUp
  },
  data () {
    return {
      activeName: 'signIn'
    }
  }
}
</script>

<style>
.el-tabs {
  width: 400px;
  padding: 2em;
  margin: 0 auto;
  background-color: #f9fafa;
}
</style>
