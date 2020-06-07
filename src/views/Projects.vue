<template>
  <base-view class="view-projects">
    Projects
    
    <add-stuff path="projects"></add-stuff>
    <!-- <add-stuff path="projects.joo.naru"></add-stuff> -->

    <projects-item
      v-for="(project, key) in projects"
      :key="key"
      :item="project"
    ></projects-item>
  </base-view>
</template>


<script>
import addStuff from '@/components/addStuff'
import projectsItem from '@/components/projectsItem'

export default {
  name: 'viewProjects',

  components: {
    addStuff,
    projectsItem
  },

  computed: {
    projects() {
      return this.$store.state.content.projects
    }
  }
}
</script>

<style lang="scss" scoped>
.view-projects {}
</style>