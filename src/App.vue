<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="stylus">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
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
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active em versões anteriores a 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
</style>
<script>

export default {
  
}
</script>
