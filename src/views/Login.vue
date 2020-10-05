<template>
  <div class="login">
    <div>
      <div>
        <svg 
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="250px" height="149px">
        <image  x="0px" y="0px" width="250px" height="149px"  xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAACVCAMAAABGkBeAAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACZFBMVEVEVWb///9EVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWZEVWb///8JTZHSAAAAynRSTlMAABFEMyJ3u+6q3YjMVWaZKyAfijkUjcEbCXnvmgcEY+T5Z0/V5jo4w8YaKa4Z+w6E9OUGb+vFAVnO+DG5pf2OmHtlZFAqEPbEcJcCWt5GuqaWkArwNxhR1gU7r5wXhZVxYlvgNkcyI/73JZHjsC8M8cJro5Sh12HP8n49x+ixSdudk3+HYLa8NHM1qVzhFjD1SF69ciTiX8DTTXzzkj5oUtn8HguLErIneB3YUwjs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" />
        </svg>
      </div>
      <div>
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
    </div>
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
          //console.log(res.data)
          this.newuser = res.data == false
          this.checked = true
        }).catch(err => {
          //console.log(err)
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
          //console.log(res.data)
          if(res.data && res.data.length == 32) {
            sessionStorage.token = res.data
            this.$router.push('/')
          }
        }).catch(err => {
          //console.log(err)
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
  flex-wrap wrap
  svg
    margin 30px auto
  &>div>div
    width 100%
    display flex
    justify-content center
    align-items center
  .error
    color red
    margin 0 0 15px 0
    text-align left
  form
    clear both
    display block
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