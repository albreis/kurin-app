<template>
  <div id="app">
    <main>
    <router-view/>
    <div class="loading" v-if="loading">      
      <img src="../public/loading.gif" />
    </div>
    </main>
    <footer>
      Version {{package.version}} | Developed by <strong><a href="https://wa.me/5551981108038">Albreis - Design &amp; Programação</a></strong>
    </footer>
  </div>
</template>

<style lang="stylus">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
body
  overflow-x hidden
footer
  text-align center
  a
    color #1f1f1f
    text-decoration none
main
  min-height 90vh
.loading
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background-color rgba(255,255,255,1)
  display flex
  justify-content center
  align-items center
  img
    width 300px
#app
  font-family 'Open Sans', Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  *
    box-sizing border-box
header
  padding 15px
  h1 
    margin 0
  p
    margin 0
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active em versões anteriores a 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
<script>
export default {
  data() {
    return {
      package: {},
      loading: false
    }
  },
  mounted() {
    this.package = require('../package.json')
    this.$bus.$on('request', value => { this.loading = true })
    this.$bus.$on('response', value => { this.loading = false })
  }
}
</script>
