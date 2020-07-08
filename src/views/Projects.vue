<template>
  <base-view class="view-projects">
    <template v-if="!$app.isLoading()">
      

      <editable-content path="projects.main" #default="{ content }">
        <app-title>{{ content[`title-${$app.locale()}`] }}</app-title>
        <app-text>{{ content[`text-${$app.locale()}`] }}</app-text>
        <!-- <base-title size="l" m-b="m">{{ content[`title-${$app.locale()}`] }}</base-title> -->
        <!-- <base-text m-b="xl">{{ content[`text-${$app.locale()}`] }}</base-text> -->
      </editable-content>
    
      <base-button v-if="$app.isLogged()" @click="addProject">{{ this.buttonText }}</base-button>

      <base-spacer :size="20">
        <projects-item
          v-for="(project, key) in projects"
          :key="key"
          :item="project"
          @click.native="showcaseProject(key)"
        ></projects-item>
      </base-spacer>

      <projects-project v-if="$route.name === 'project'"></projects-project>
    </template>
  </base-view>
</template>


<script>
import appTitle from '@/components/appTitle'
import appText from '@/components/appText'
import editableContent from '@/components/editableContent'
import projectsItem from '@/components/projectsItem'
import projectsProject from '@/components/projectsProject'
import { isImage } from '@/utils/regex'

export default {
  name: 'viewProjects',

  components: {
    appTitle,
    appText,
    editableContent,
    projectsItem,
    projectsProject
  },

  /* created() {
    setTimeout(() => {
      let projects = this.$store.state.content.projects
      for (let project in projects) {
        projects[project].link = ''
        projects[project]['subtitle-en'] = ''
        projects[project]['subtitle-fi'] = ''
        console.log('projects[project]', projects[project]);
        
        this.$api.setDocument('projects', project, projects[project])
      }
    }, 10000);
  }, */

  /* watch: {
    '$route': {
      immediate: true,
      deep: true,
      handler(newValue) {
        //return newValue
        console.log(newValue);
        
      }
    }
  }, */

  computed: {
    projects() {
      let locale = this.$app.locale()
      if (!this.$store.state.app.isLoading) {
        let { main, ...projects } = this.$store.state.content.projects
        return projects
        /* return {
          main: main[locale],
          projects: projects
        } */
      }
      return {}
    },

    buttonText() {
      return this.$store.state.app.locale === 'en'
        ? 'add project'
        : 'lisää projekti'
    }
  },

  methods: {
    showcaseProject(key) {      
      this.$router.push({ name: 'project', params: { id: key } })
    },

    addProject() {
      //let { main, ...projects } = this.$store.state.content.projects
      //let ids = Object.keys(projects.projects)
      let ids = Object.keys(this.projects)
      let data = {
        'title-en': '',
        'title-fi': '',
        'text-en': '',
        'text-fi': '',
        year: '',
        bg: '.png'
      }

      // If there is at least one project in database, create data object based on it.
      if (ids.length > 0) {
        data = {}
        for (let key in this.projects[ids[0]]) {
          data[key] = isImage.test(this.projects[ids[0]][key]) ? '.png' : ''
        }
      }

      console.log('Projects.vue - currently adding new project')
      this.$store.dispatch('modals/SET_MODAL', {
        active: 'editContent',
        data: { content: data, path: this.$route.name }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.view-projects {}
</style>