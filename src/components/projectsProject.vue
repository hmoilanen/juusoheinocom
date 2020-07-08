<template>
  <div class="projects-project">      
    <base-loader v-if="loading"></base-loader>
    <template v-else>
      <base-wrapper maxWidth="medium" :padding="true">
        <editable-content :path="dynamicPath" #default="{ content }">

          <content-carousel :amount="3">
            <base-image
              v-for="(image, index) in 5"
              :key="index"
              :src="dynamicImage(content.bg)"
            ></base-image>
          </content-carousel>

          <base-title
            :size="22"
            :scaling="true"
            lineHeight="1.2em"
            m-t="xl"
          >{{ content['title-' + locale] }}</base-title>
          <base-flex center="y" :m-b="18">
            <base-title :size="textTitleSize">{{ content['type-' + locale] }}, {{ content.year }}</base-title>
            <base-link mode="tab" :to="content.link">
              <base-icon class="redirect">redirect</base-icon>
            </base-link>
          </base-flex>
          
          <base-spacer size="xl" :scaling="3">
            <div>
              <base-title :size="textTitleSize">{{ subtitle('role') }}</base-title>
              <base-list
                :list="content['role-' + locale]"
                #default="{ item }"
                marker="square"
              >
                <app-text>{{ item }}</app-text>
              </base-list>
            </div>

            <div>
              <base-title :size="textTitleSize">{{ subtitle('about') }}</base-title>
              <app-text v-html="content['text-' + locale]"></app-text>
            </div>

            <div>
              <base-title :size="textTitleSize">{{ subtitle('learned') }}</base-title>
              <base-list
                :list="content['learning-' + locale]"
                #default="{ item }"
                marker="square"
              >
                <app-text>{{ item }}</app-text>
              </base-list>
            </div>
          </base-spacer>

        </editable-content>
      </base-wrapper>
    </template>
  </div>
</template>

<script>
import store from '@/store/index'
import editableContent from '@/components/editableContent'
import contentCarousel from '@/components/contentCarousel'
import appText from '@/components/appText'

export default {
  name: 'projectsProject',

  components: {
    editableContent,
    contentCarousel,
    appText
  },

  data() {
    return {
      loading: true,
      routeName: '',
      projectId: '',
      textTitleSize: 7
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
    
    dynamicPath() {
      return `${this.routeName}.${this.projectId}`
    }
  },

  methods: {
    dynamicImage(image) {
      let imageURL = this.$store.getters['app/GET_URL'].imageURL
      return `${imageURL}${this.routeName}/${this.projectId}/${image}`
    },

    subtitle(type) {
      return !this.$app.isLoading()
        ? this.$store.state.content.projects.main[`subtitle-${type}-${this.locale}`]
        : ''
    }
  }
}
</script>

<style lang="scss" scoped>
$projects-project--color-bg: $app-color--theme;
$projects-project--color-hl: $app-color--hl;

.projects-project {
  position: relative;
  overflow-y: auto;
  padding-top: 60px;
  padding-bottom: 3rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $projects-project--color-bg;

  .redirect {
    margin-left: 0.5rem;
    margin-top: 0.2rem;
    @extend %clickable;
    color: $projects-project--color-hl;
  }
}
</style>
