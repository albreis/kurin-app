<template>
  <div class="home">
    <header>
      <h1><strong>Kurin</strong></h1>
      <p>a simple plan, for simple peoples</p>
    </header>
    <div class="projects">
      <label class="add-project">
        <input type="text" v-model="newProject" placeholder="Create project" @keydown.enter="addProject" />
      </label>
      <transition-group tag="ul" name="slide-fade">
        <li :key="project.id" :index="key" class="project" v-for="(project, key) in projects">
          <div class="project-name">
            <div class="left">
              <span @click="openProject(project)">
                <input type="text" readonly="readonly" v-model="project.name">
              </span>
              <small>({{project.done_tasks}} / {{project.open_tasks}})</small>
            </div>
            <div class="center">
            </div>
            <div class="right">
                <button @click="deleteProject(project)" type="button">remover</button>
            </div>
          </div>
          <div v-if="project_open == project" class="tasks">
            <label class="add-task">
              <input type="text" v-model="newTask" placeholder="Create task" @keydown.enter="addTask(project_open.id)" />
            </label>
            <transition-group tag="ul" name="slide-fade">
              <li class="task" :key="task.id" :index="key" v-for="(task, key) in tasks" :data-done="task.done_at != '0000-00-00 00:00:00'">
                <div class="left">
                  <div class="task-name">
                    <label><input type="checkbox" @change="doneTask(project, task)" :checked="task.done_at != '0000-00-00 00:00:00'" /></label>
                    <input type="text" readonly="readonly" v-model="task.name">
                  </div>
                </div>
                <div class="center">

                </div>
                <div class="right">
                  <button @click="deleteTask(project, task)" type="button">remover</button>
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
.projects
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
    input 
      cursor inherit
  .tasks
    width 100%
  .task-name
    display flex
    align-items center
    cursor pointer
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
export default {
  name: 'Home',
  data() {
    return {
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
    openProject(project) {
      this.tasks = []
      this.project_open = this.project_open == project ? null : project
      if(this.project_open) {
        this.getTasks(project.id);
      }
    },
    getProjects() {
      this.axios.get('projects').then(res => {
        //console.log(res.data)
        this.projects = res.data
      }).catch(err => {
        //console.log(err)
      })
    },
    getTasks(project_id) {
      this.axios.get(`projects/${project_id}/tasks`).then(res => {
        //console.log(res.data)
        this.tasks = res.data
      }).catch(err => {
        //console.log(err)
      })
    },
    addTask(project_id) {
      this.axios.post(`projects/${project_id}/tasks`, {
        name: this.newTask
      }).then(res => {
        //console.log(res.data)
        this.newTask = null
        this.getTasks(project_id)
      }).catch(err => {
        //console.log(err)
      })
    },
    addProject() {
      this.axios.post(`projects`, {
        name: this.newProject
      }).then(res => {
        //console.log(res.data)
        this.newProject = null
        this.getProjects()
      }).catch(err => {
        //console.log(err)
      })
    },
    doneTask(project, task) {
      let action = task.done_at == '0000-00-00 00:00:00' ? 'done' : 'undone';
      this.axios.post(`projects/${project.id}/tasks/${task.id}/${action}`).then(res => {
        //console.log(res.data)
        task.done_at = task.done_at == '0000-00-00 00:00:00' ? new Date() : '0000-00-00 00:00:00'
      }).catch(err => {
        //console.log(err)
      })
    },
    deleteTask(project, task) {
      this.axios.delete(`projects/${project.id}/tasks/${task.id}`).then(res => {
        //console.log(res.data)
        this.getTasks(project.id)
      }).catch(err => {
        //console.log(err)
      })
    },
    deleteProject(project) {
      this.axios.delete(`projects/${project.id}`).then(res => {
        //console.log(res.data)
        this.getProjects(project.id)
      }).catch(err => {
        //console.log(err)
      })
    }
  }
}
</script>
