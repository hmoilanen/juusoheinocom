<template>
  <div class="home-projects">
    <editable-content path="home.projects" #default="{ content }">
      <base-title :size="titleSize" :main="true">{{ content[`title-${$app.locale()}`] }}</base-title>
      <base-link to="projects">{{ content[`link-${$app.locale()}`] }} &#8594;</base-link>
    </editable-content>
    
    <div class="grid" :style="styling">
      <div
        class="card"
        v-for="(project, key) in projects"
        :key="key"
      >
        <base-link :to="{ name: 'project', params: { id: key } }">
          <div class="bg">
            <base-bg :source="bgSource(key, project.bg)" posX="center" posY="top"></base-bg>
          </div>
        </base-link>
        <div class="info">
          <base-title :size="8">{{ project['title-' + $app.locale()] }}</base-title>
          <base-text>{{ project.year }}</base-text>
        </div>
        <base-link class="link" :to="{ name: 'project', params: { id: key } }">
          <base-text>more &#8594;</base-text>
        </base-link>
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
        let { main, ...projects } = this.$store.state.content.projects        
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
$card--color-link-hover: $app-color--hl;
.home-projects {
  
  .grid {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    // grid-gap, see: this.styling
    transition: grid-gap 0.3s ease;
  }
  
  .card {
    .bg {
      position: relative;
      height: 0;
      padding-bottom: 100%;
    }
    .info {
      margin-top: 0.8rem;
      margin-bottom: 0.2rem;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
    }
  }
    
  //.base-link:hover .base-text { color: $card--color-link-hover; }
  .base-link:hover {
    &,
    & .base-text { color: $card--color-link-hover; }
  }
}
</style>
