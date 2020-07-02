<template>
  <div class="projects-project">      
    <base-loader v-if="loading"></base-loader>
    <template v-else>
      <editable-content :path="dynamicPath" #default="{ content }">
        
        <content-carousel :amount="3">
          <base-image
            v-for="(image, index) in 5"
            :key="index"
            :src="dynamicImage(content.bg)"
          ></base-image>
        </content-carousel>

        <base-wrapper maxWidth="max" :padding="true">
          
          <!-- <base-title :size="48" m-t="xl">{{ content['title-' + locale] }}</base-title> -->
          <base-title :size="40" m-t="xl">{{ content['title-' + locale] }}</base-title>
          <base-flex align="baseline">
            <base-title :size="12">{{ content['subtitle-' + locale] }}</base-title>
            <base-text m-l="s">{{ content.year }}</base-text>
          </base-flex>
          <base-title :size="6" m-b="l">{{ content['type-' + locale] }}</base-title>
          <base-list :list="content['role-' + locale]"></base-list>
          <base-flex>
            <base-link mode="tab" :to="content.link">
              <base-icon>link</base-icon>
            </base-link>
          </base-flex>
          <base-text>{{ content['text-' + locale] }}</base-text>
          <base-list :list="content['learning-' + locale]"></base-list>
        </base-wrapper>

      </editable-content>
    </template>
  </div>
</template>

<script>
import store from '@/store/index'
import editableContent from '@/components/editableContent'
import contentCarousel from '@/components/contentCarousel'

export default {
  name: 'projectsProject',

  components: {
    editableContent,
    contentCarousel
  },

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

    const path = 'ui.preventBodyScrolling'

    this.$store.dispatch('SET_STATE', { path: path, data: true })
    this.$on('hook:beforeDestroy', () => {
      this.$store.dispatch('SET_STATE', { path: path, data: false })
    })
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
    }
  }
}
</script>

<style lang="scss" scoped>
.projects-project {
  position: relative;
  overflow-y: auto;

  //POIISTUU!!
  @extend %absolute-0000;
  position: fixed;
  background: rgba(255, 255, 255, 0.98);
  /* .base-image {
    width: 200px;
    border: 2px solid red;
  } */
}
</style>
