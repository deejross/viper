<template>
  <div class="home">
    <img src="~statics/viper-logo.png" alt="Viper" style="-webkit-filter: drop-shadow(1px 1px 0 #777) drop-shadow(-1px -1px 2 #777); filter: drop-shadow(1px 1px 0 #777) drop-shadow(-1px -1px 0 #777);" />
    <h3>Viper</h3>
    <credentials />
  </div>
</template>

<script>
import Credentials from './Credentials.vue'

export default {
  components: {
    Credentials
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

.home
  margin-top 50px
  a
    color #35495E

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px
</style>
