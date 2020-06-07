<template>
  <base-view class="view-projects">
    Projects
    <!-- <add-things></add-things> -->
    <projects-item
      v-for="(project, key) in projects"
      :key="key"
      :item="project"
    ></projects-item>
    <!-- <base-text>{{ this.projects }}</base-text> -->
  </base-view>
</template>


<script>
import projectsItem from '@/components/projectsItem'

export default {
  name: 'viewProjects',

  components: { projectsItem },

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