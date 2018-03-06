export const redirectToStart = {
  created () {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.replace('/start')
    }
  }
}

export const redirectToHome = {
  created () {
    if (this.$store.getters.isAuthenticated) {
      this.$router.replace('/')
    }
  }
}
