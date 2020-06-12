<template>
  <base-flex class="projects-project" :column="true" center="xy">
    
    <template v-if="loading">
      <base-loader></base-loader>
    </template>

    <template v-else>
      <editable-content :path="dynamicPath" #default="{ content }">
        <base-bg :source="dynamicImage(content.bg)"></base-bg>
        <base-image :src="dynamicImage(content.bg)"></base-image>
        <base-title>PROJECT: {{ content['title-' + locale] }}</base-title>
        <base-text>{{ content }}</base-text>
        <!-- <template>
          <base-bg :source="currentProject.bg"></base-bg>
          <base-image :src="currentProject.bg"></base-image>
          <base-title>PROJECT: {{ this.currentProject.title }}</base-title>
          <base-text>{{ this.currentProject }}</base-text>
        </template> -->
      </editable-content>
    </template>
    
    <base-button @click="goBack" m-t="l">back</base-button>
  </base-flex>
</template>

<script>
import editableContent from '@/components/editableContent'

export default {
  name: 'projectsProject',

  components: { editableContent },

  data() {
    return {
      loading: true
    }
  },

  watch: {
    '$store.state.app.isLoading': {
      immediate: true,
      handler(newValue) {
        if (newValue === false) { // When loading no more
          this.loading = false
        }
      }
    }
  },

  /* created() {
    console.log('this.$route', this.$route);
    
  }, */

  computed: {
    locale() {
      return this.$store.state.app.locale
    },
    
    dynamicPath(image) {
      let routeName = this.$route.matched[0].name
      let id = this.$route.params.id

      /* if (image) {
        let imageURL = this.$store.getters['app/GET_URL'].imageURL
        return `${imageURL}${routeName}/${id}/${image}`
      } */

      return `${routeName}.${id}`
    },

    currentProject() {
      /* if (!this.$store.state.app.isLoading) {
        let project = JSON.parse(JSON.stringify(this.$store.state.content.projects[this.$route.params.id]))
        let imageURL = this.$store.getters['app/GET_URL'].imageURL + 'projects/' + this.$route.params.id + '/' + project.bg
  
        project.bg = imageURL
        return project
      }
      return {} */
      let project = JSON.parse(JSON.stringify(this.$store.state.content.projects[this.$route.params.id]))
      console.log('project', project);
      let id = this.$route.params.id
      let path = `projects/${id}/${project.bg}`
      console.log('id', id);
      //let path = 'projects/home/testObject/joni.hoitaa.png'
      console.log('path', path);
    
      /* https://storage.googleapis.com/juusoheinocom.appspot.com/images/home/testObject/joni-hoitaa.png */
      /* https://storage.googleapis.com/juusoheinocom.appspot.com/images/projects/IhtHAhyFLY3zIKB3MzG3/joni-hoitaa.png */
      
      //let imageURL = this.$store.getters['app/GET_URL'].imageURL + 'projects/' + this.$route.params.id + '/' + project.bg
      let imageURL = this.$store.getters['app/GET_URL'].imageURL + path
      console.log('imageURL', imageURL);
      //let imageURL = 'gs://juusoheinocom.appspot.com/images/projects/IhtHAhyFLY3zIKB3MzG3/joni-hoitaa.png'

      project.bg = imageURL
      return project
    },

    /* currentBackground() {
      let imageURL = this.$store.getters['app/GET_URL'].imageURL
      return imageURL + 'projects/' + this.$route.params.id + '/' + this.currentProject.bg
    } */
  },

  methods: {
    dynamicImage(image) {
      let routeName = this.$route.matched[0].name
      let id = this.$route.params.id
      let imageURL = this.$store.getters['app/GET_URL'].imageURL
      
      return `${imageURL}${routeName}/${id}/${image}`
    },

    goBack() {
      //this.$router.go(-1)
      this.$router.push({ name: 'projects' })
    }
  }
}
</script>

<style lang="scss" scoped>
.projects-project {

  //POIISTUU!!
  @extend %absolute-0000;
  position: fixed;
  background: pink;
  opacity: 0.95;
  .base-image {
    opacity: 0.7;
    width: 200px;
    border: 2px solid red;
  }
}
</style>
