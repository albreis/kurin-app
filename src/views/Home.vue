<template>
  <div class="home">    
    <header>
      <div class="left">
        
      </div>
      <div class="center">
        <h1><strong>Kurin</strong></h1>
        <p>a simple plan, for simple peoples</p>
      </div>
      <div class="right">
      </div>
    </header>
    <div class="projects">
      <label v-if="!project_open" class="add-project">
        <input type="text" v-model="newProject" placeholder="Create project" @keydown.enter="addProject" />
        <input type="search" placeholder="Search a project..." v-model="search_project" />
      </label>
      <label v-else class="add-task">
        <input type="text" v-model="newTask" placeholder="Create task" @keydown.enter="addTask(project_open.id)" />
        <input type="search" placeholder="Search a task..." v-model="search_task" />
      </label>
      <transition-group tag="ul" name="slide-fade">
        <li :key="project.id" :index="key" class="project" v-for="(project, key) in projects" v-if="!project_open || project_open == project" v-show="!search_project || (search_project && project.name.includes(search_project))">
          <div class="project-name">
            <div class="left">
              <span @click="openProject(project)">
                {{project.name}}
                <small>({{project.done_tasks}} / {{project.open_tasks}})</small>
              </span>
            </div>
            <div class="center">
            </div>
            <div class="right">
              <div class="actions">
                  <label class="hidden-input" v-if="project_open"><input type="checkbox" v-model="project.coding" /><i :class="{coding: project.coding}" class="fa fa-server"></i></label>
                  <label class="hidden-input" v-if="project_open"><input type="checkbox" v-model="project.editing" /><i :class="{editing: project.editing}" class="fa fa-edit"></i></label>
                  <label class="hidden-input" v-if="project_open"><input type="checkbox" v-model="project.show_done" /><i :class="{show_done: project.show_done}" class="fa fa-check"></i></label>
                  <button @click="deleteProject(project)" type="button"><i class="fa fa-trash"></i></button>
              </div>
            </div>
          </div>
          <div v-if="project_open == project" class="extras">
            <div class="description-editor" v-if="project.editing">
              <input type="text" v-model="project.name" />
              <textarea v-model="project.description" cols="30" rows="10"></textarea>
              <button type="button" @click="updateProjectData(project)">salvar</button>
            </div>
            <code-editor :project_open="project_open" class="code-editor" v-if="project.coding"></code-editor>
          </div>
          <div v-if="project_open == project" class="tasks">
            <transition-group tag="ul" name="slide-fade" v-if="!project.editing && !project.coding">
              <li class="task" :key="task.id" :index="key" v-for="(task, key) in tasks" :data-done="isDone(task)" v-show="(!isDone(task) || project.show_done) && (!search_task || (search_task && project.name.includes(search_task)))">
                <div class="left">
                  <div class="task-name">
                    <label><input type="checkbox" @change="doneTask(project, task)" :checked="isDone(task)" /></label>
                    {{task.name}}
                  </div>
                </div>
                <div class="center">

                </div>
                <div class="right">
                  <div class="actions">
                    <button @click="deleteTask(project, task)" type="button"><i class="fa fa-trash"></i></button>
                  </div>
                </div>
              </li>
            </transition-group>
          </div>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
:focus
  outline none
.extras
  width 100%
.description-editor
  textarea
    width 100%
    margin-top 15px
  button
    border 1px solid #789
    color #fff
    font-weight bold
    background #234!important
    border-radius 5px
    text-decoration none!important
    padding 5px 10px
    margin-bottom 15px
.actions
  display flex
  &>*
    margin-left 15px
    cursor pointer
  .show_done, .editing
    color green
.hidden-input
  input
    display none
header
  display flex
  justify-content space-between
  align-items center
  padding 15px 0
  &>div
    width 33.33%
    white-space nowrap
.add-task, .add-project
  display flex
  margin-top 5px
  input + input
    margin-left 0
    border-left none
  input
    height 30px
    margin-right auto
    display block
    border 1px solid #789
    padding 0 15px
  [type="text"]
    border-top-left-radius 30px
    border-bottom-left-radius 30px
  [type="search"]
    border-top-right-radius 30px
    border-bottom-right-radius 30px
.projects
  button
    border none
    background transparent
    text-decoration underline
  input[type="text"]
    width 100%
    height 30px
  .project-name
    width 100%
    cursor pointer
    display flex
    align-items center
    justify-content space-between
    .left
      display flex
      align-items center
      width 100%
      justify-content left
      span
        width 100%
      small
        white-space nowrap
        margin-left 15px
    input 
      cursor inherit
  .tasks
    width 100%
  .task-name
    display flex
    align-items center
    cursor pointer
    font-size 13px
    input 
      cursor inherit
  ul
    list-style none
    text-align left
    padding 0
    margin 0
    li
      padding 5px 0
      cursor pointer
      display flex
      justify-content space-between
      align-items center
      flex-wrap wrap
      ul
        border-left 1px solid #678
        width 100%
        li
          padding 5px
    li+li
      border-top 1px solid #678
  [data-done="true"]
    background #5d8
  [readonly="readonly"]:focus, [readonly="readonly"]
    border none
    padding 0
    margin 0
    outline none
    background transparent
</style>

<script>
import CodeEditor from '@/components/CodeEditor'

export default {
  name: 'Home',
  components: {
    CodeEditor
  },
  data() {
    return {
      search_project: null,
      search_task: null,
      project_open: null,
      newTask: null,
      newProject: null,
      projects: [],
      tasks: [],
    }
  },
  mounted() {
    if(!sessionStorage.token) {
      this.$router.push('/login')
      return false;
    }
    this.getProjects()
  },
  methods: {
    updateProjectData(project) {
      this.axios.patch(`projects/${project.id}`, {
        name: project.name,
        description: project.description
      }).then(res => {
        console.log(res.data)
      }).catch(err => {
      })
    },
    isDone(task) {
      return task.done_at != '0000-00-00 00:00:00'
    },
    openProject(project) {
      this.tasks = []
      this.project_open = this.project_open == project ? null : project
      if(this.project_open) {
        this.getTasks(project.id);
      }
    },
    getProjects() {
      this.axios.get('projects').then(res => {
        this.projects = res.data
      }).catch(err => {
      })
    },
    getTasks(project_id) {
      this.axios.get(`projects/${project_id}/tasks`).then(res => {
        this.tasks = res.data
      }).catch(err => {
      })
    },
    addTask(project_id) {
      this.axios.post(`projects/${project_id}/tasks`, {
        name: this.newTask
      }).then(res => {
        this.newTask = null
        this.getTasks(project_id)
      }).catch(err => {
      })
    },
    addProject() {
      this.axios.post(`projects`, {
        name: this.newProject
      }).then(res => {
        this.newProject = null
        this.getProjects()
      }).catch(err => {
      })
    },
    doneTask(project, task) {
      let action = task.done_at == '0000-00-00 00:00:00' ? 'done' : 'undone';
      if(!this.isDone(task)) {
        this.axios.post(`projects/${project.id}/tasks/${task.id}/${action}`).then(res => {
          task.done_at = new Date()
        }).catch(err => {
        })
      }
    },
    deleteTask(project, task) {
      if(!confirm('Do you really delete this item?')) return false;
      this.axios.delete(`projects/${project.id}/tasks/${task.id}`).then(res => {
        this.getTasks(project.id)
      }).catch(err => {
      })
    },
    deleteProject(project) {
      if(!confirm('Do you really delete this item?')) return false;
      this.axios.delete(`projects/${project.id}`).then(res => {
        this.getProjects(project.id)
      }).catch(err => {
      })
    }
  }
}
</script>
