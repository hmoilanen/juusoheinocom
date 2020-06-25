<template>
  <div class="home-projects">
    <editable-content path="home.projects" #default="{ content }">
      <base-title :size="titleSize">{{ content[`title-${$app.locale()}`] }}</base-title>
      <base-link to="projects">{{ content[`link-${$app.locale()}`] }}</base-link>
    </editable-content>
    
    <div class="grid" :style="styling">
      <div
        class="card"
        v-for="(project, key) in projects"
        :key="key"
      >
        <base-bg :source="bgSource(key, project.bg)" posY="top"></base-bg>
        <!-- <base-title :center="true">{{ project['title-' + $app.locale()] }}</base-title> -->
        <!-- <span>{{ project }}</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import editableContent from '@/components/editableContent'

export default {
  name: 'homeProjects',

  components: { editableContent },

  props: {
    titleSize: [String, Number]
  },

  data() {
    return {
    }
  },

  computed: {
    projects() {
      if (!this.$app.isLoading()) {
        let { intro, ...projects } = this.$store.state.content.projects
        return projects
      } else return null
    },

    styling() {
      // HUOM! LAITA LOPUKSI GAP SYNKKAAMAAN base-view:N PADDINGIN KOON KANSSA!!!
      // HUOM! LAITA LOPUKSI GAP SYNKKAAMAAN base-view:N PADDINGIN KOON KANSSA!!!
      // HUOM! LAITA LOPUKSI GAP SYNKKAAMAAN base-view:N PADDINGIN KOON KANSSA!!!
      // HUOM! NYT SÄÄDÖT DUMMYJA
      let windowWidth = this.$store.state.ui.window.width
      let breakpoint = this.$store.getters['ui/GET_BREAKPOINT']
      let gap = 1 // = '1rem'
      
      if (windowWidth > 900) { gap = 1.8 }
      else if (windowWidth > 1000) { gap = 2.8 }

      return {
        gridGap: gap + 'rem'
      }
    }
  },

  methods: {
    bgSource(key, imageName) {
      let imageURL = this.$store.getters['app/GET_URL'].imageURL
      return `${imageURL}projects/${key}/${imageName}`
    }
  }
}
</script>

<style lang="scss" scoped>
.home-projects {
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    // grid-gap, see: this.styling
    transition: grid-gap 0.3s ease;
  }
  
  .card {
    position: relative;
    height: 0;
    padding-bottom: 56.25%;
    // DUMMY-TYYLIT -> VAHTUU / POSTUU!!
    /* display: flex;
    align-items: center;
    justify-content: center;
    height: 50vh;
    background: $app-color--hl; */
  }
}
</style>
