<template>
  <base-view class="view-projects">
    <template v-if="projects.intro">
      <base-title>{{ projects.intro.title }}</base-title>
      <base-text>{{ projects.intro.text }}</base-text>
    </template>
    
    <add-content path="projects"></add-content>
    <projects-item
      v-for="(project, key) in projects.projects"
      :key="key"
      :item="project"
      @click.native="showcaseProject(key)"
    ></projects-item>

    <!-- <template v-for="(project, key) in projects.projects">
      
        :path="dynamicProjectPath(key)"
        :key="key"
         #default="{ content }"
      
        <projects-item
          :item="content"
          @click.native="showcaseProject(key)"
        ></projects-item>
        
      
    </template> -->

    <projects-project v-if="$route.name === 'project'"></projects-project>
  </base-view>
</template>


<script>
import addContent from '@/components/addContent'
import projectsItem from '@/components/projectsItem'
import projectsProject from '@/components/projectsProject'

export default {
  name: 'viewProjects',

  components: {
    addContent,
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
    }
  },

  methods: {
    showcaseProject(key) {      
      this.$router.push({ name: 'project', params: { id: key } })
    }
  }
}
</script>

<style lang="scss" scoped>
.view-projects {}
</style>