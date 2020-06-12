<template>
  <base-flex class="projects-project" :column="true" center="xy">
    <base-loader v-if="loading"></base-loader>

    <template v-else>
      <editable-content :path="dynamicPath" #default="{ content }">
        <base-bg :source="dynamicImage(content.bg)"></base-bg>
        <base-image :src="dynamicImage(content.bg)"></base-image>
        <base-title>PROJECT: {{ content['title-' + locale] }}</base-title>
        <base-text>TEXT: {{ content['text-' + locale] }}</base-text>
        <br>
        <base-text>{{ content }}</base-text>
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
      loading: true,
      routeName: '',
      projectId: ''
    }
  },

  created() {
    this.routeName = this.$route.matched[0].name
    this.projectId = this.$route.params.id
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

  computed: {
    locale() {
      return this.$store.state.app.locale
    },
    
    dynamicPath(image) {
      return `${this.routeName}.${this.projectId}`
    }
  },

  methods: {
    dynamicImage(image) {
      let imageURL = this.$store.getters['app/GET_URL'].imageURL
      return `${imageURL}${this.routeName}/${this.projectId}/${image}`
    },

    goBack() {
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
