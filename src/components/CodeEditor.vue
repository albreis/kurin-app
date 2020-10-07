<template>
  <div class="ftp">
    <h3>Connectar a um servidor FTP</h3>
    <div class="login">
      <input type="text" v-model="ftp_host" placeholder="Host" />
      <input type="text" v-model="ftp_user" placeholder="User" />
      <input type="text" v-model="ftp_pass" placeholder="Pass" />
      <button type="button" @click="loadFile('.')">connectar</button>
    </div>
    <div class="editor-container">
      <div class="left">
      <editor class="editor" :class="{hashfiles: files.length}" :options="options" v-model="code" :language="language"></editor>
      </div>
      <div class="right">
        <button v-if="selected_file" type="button" @click="save">Save</button> 
        <button v-if="selected_file" type="button" @click="saveClose">Save and Close</button>
        <ul class="files">
          <li v-for="file in files" :key="file" :class="{active: file == selected_file}" @click="loadFile(file)">
            {{file}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import MonacoEditor from 'vue-monaco'
export default {
  components: {
    editor: MonacoEditor,
  },
  props: ['project_open'],
  data() {
    return {
      options: {
        minimap: {
          enabled: false,
        },
        theme: 'vs-dark',
        automaticLayout: true
      },
      code: 'asdasd',
      files: [],
      current_dir: [],
      selected_file: '.',
      language: '',
      ftp_host: '',
      ftp_user: '',
      ftp_pass: '',
    }
  },
  methods: {
    save() {
      this.axios.put(`ftp-save`, {
        ftp_host: this.ftp_host,
        ftp_user: this.ftp_user,
        ftp_pass: this.ftp_pass,
        file: this.selected_file,
        code: this.code,
        project_id: this.project_open.id,
      }).then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    saveClose() {

    },
    loadFile(file) {
      this.selected_file = file
      this.language = this.selected_file.split('.').pop()
      this.axios.post(`ftp-load`, {
        ftp_host: this.ftp_host,
        ftp_user: this.ftp_user,
        ftp_pass: this.ftp_pass,
        current_dir: this.current_dir,
        file: this.selected_file,
        project_id: this.project_open.id,
      }).then(res => {
        console.log(res.data)
        this.code = ''
        if(typeof res.data != 'object') {
          this.code = res.data
        } else if (typeof res.data == 'object'){
          this.files = res.data
          if(this.selected_file == '..' && this.current_dir.length > 1) {
            this.current_dir.pop()
          } else if(this.selected_file !== '..' && this.selected_file != '.') {
            this.current_dir.push(this.selected_file)
          } else if (this.current_dir.length == 0) {
            this.current_dir = ['.']
          }
        }
        console.log(this.current_dir)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  display flex
  justify-content space-between
.editor-container
  display flex
  width 100%
.files
  width 30vw
.left 
  width 70%
.right
  width 30%
  padding 15px
  ul
    list-style none
    padding 0
    margin 0
    li
      padding 0 5px
    li:hover, li.active
      background #789
.editor
  width: 100%;
  height: 400px;
  margin 15px 0
.editor.hasfiles
  width: 70vw;
</style>