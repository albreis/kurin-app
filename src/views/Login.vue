<template>
  <div class="login">
    <form @submit="login($event)">
      <h1>Login / Register</h1>
      <p v-if="newuser">You don't have an account. Please create a password before login.</p>
      <input v-if="!checked" required type="email" v-model="email" placeholder="Your e-mail" />
      <input v-if="checked" required type="password" v-model="password" placeholder="Your password" />
      <input v-if="newuser" required type="password" v-model="confirm_password" placeholder="Repeat your password" />
      <p class="error" v-if="password_error">Password not match</p>
      <button type="submit">NEXT</button><br/>
      <small v-if="checked" @click="back">back</small>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirm_password: '',
      checked: false,
      newuser: false,
      password_error: false
    }
  },
  methods: {
    back() {
      this.checked = false
      this.newuser = false
    },
    login(event) {
      event.preventDefault()
      if(!this.checked) {
        this.axios.post('login/verify', {
          email: this.email
        }).then(res => {
          console.log(res.data)
          this.newuser = res.data == false
          this.checked = true
        }).catch(err => {
          console.log(err)
        })
      } else {
        if(this.newuser && this.password != this.confirm_password) {
          this.password_error = true;
          return false;
        }
        this.axios.post('login', {
          email: this.email,
          password: this.password,
          confirm_password: this.confirm_password,
        }).then(res => {
          console.log(res.data)
          if(res.data && res.data.length == 32) {
            sessionStorage.token = res.data
            this.$router.push('/')
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  display flex
  justify-content center
  align-items center
  height 80vh
  .error
    color red
    margin 0 0 15px 0
    text-align left
  form
    width 350px
    padding 30px
    border 1px solid #456
    border-radius 5px
    background #fff
    input
      height 40px
      padding 0 15px
      border 1px solid #456
      border-radius 6px
      color #234
      width 100%
      margin-bottom 15px
    &::placeholder
      color #789
    button
      width 100%
      height 40px
      line-height 40px
      border none
      background #567
      color #fff
      font-weight bold
      text-align center
      border-radius 6px
      cursor pointer
</style>