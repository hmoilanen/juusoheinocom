<template>
  <base-view class="view-projects">
    <template v-if="projects.intro">
      <base-title>{{ projects.intro.title }}</base-title>
      <base-text>{{ projects.intro.text }}</base-text>
    </template>
    
    <base-button
      v-if="$api.isLogged()"
      @click="addProject"
    >{{ this.buttonText }}</base-button>
    <projects-item
      v-for="(project, key) in projects.projects"
      :key="key"
      :item="project"
      @click.native="showcaseProject(key)"
    ></projects-item>
      <!-- :item="{ project: project, key: key }" -->

    <projects-project v-if="$route.name === 'project'"></projects-project>
  </base-view>
</template>


<script>
import projectsItem from '@/components/projectsItem'
import projectsProject from '@/components/projectsProject'
import { isImage } from '@/utils/regex'

export default {
  name: 'viewProjects',

  components: {
    projectsItem,
    projectsProject
  },

  computed: {
    projects() {
      let locale = this.$store.state.app.locale
      if (!this.$store.state.app.isLoading) {
        let { intro, ...projects } = this.$store.state.content.projects
        return {
          intro: intro[locale],
          projects: projects
        }
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
      let { intro, ...projects } = this.$store.state.content.projects
      let ids = Object.keys(projects)
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
        for (let key in projects[ids[0]]) {
          data[key] = isImage.test(projects[ids[0]][key]) ? '.png' : ''
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