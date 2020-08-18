<template>
  <div class="projects-project">      
    <base-loader v-if="loading"></base-loader>
    <app-content-wrapper v-else>
      <editable-content :path="dynamicPath" #default="{ content }">

				<content-carousel>
					<div
						v-for="(image, index) in content.images"
						:key="image + index"
						class="image"
					>
						<base-bg :source="dynamicImage(image)" fit="contain"></base-bg>
					</div>
				</content-carousel>

      	<base-wrapper maxWidth="medium">
          <base-title
						class="gsap--projects-project--info"
            :size="22"
            :scaling="true"
            lineHeight="1.2em"
            m-t="xl"
          >{{ content['title-' + locale] }}</base-title>
          <base-flex class="gsap--projects-project--info" center="y" :m-b="18">
            <base-title :size="textTitleSize">{{ content['type-' + locale] }}, {{ content.year }}</base-title>
            <base-link mode="tab" :to="content.link" class="redirect">
              <base-icon class="redirect-icon" :only-stroke="true">redirect</base-icon>
            </base-link>
          </base-flex>
          
          <base-spacer size="xl" :scaling="3">
            <div class="gsap--projects-project--info">
              <base-title :size="textTitleSize">{{ subtitle('role') }}</base-title>
              <base-list
                :list="content['role-' + locale]"
                #default="{ item }"
                marker="square"
              >
                <app-text>{{ item }}</app-text>
              </base-list>
            </div>

            <div class="gsap--projects-project--info">
              <base-title :size="textTitleSize" :m-b="2">{{ subtitle('about') }}</base-title>
              <app-text v-html="content['text-' + locale]"></app-text>
            </div>

            <div class="gsap--projects-project--info">
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

      	</base-wrapper>
      </editable-content>
    </app-content-wrapper>
  </div>
</template>

<script>
import store from '@/store/index'
import appContentWrapper from '@/components/appContentWrapper'
import editableContent from '@/components/editableContent'
import contentCarousel from '@/components/contentCarousel'
import appText from '@/components/appText'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'projectsProject',

  components: {
    appContentWrapper,
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
	
	mounted() {
		gsap.utils.toArray('.gsap--projects-project--info').forEach(info => {
			gsap.from(info, 0.6, {
				scrollTrigger: {
					scroller: '.projects-project',
					trigger: info,
					//start: 'top 95%',
					start: '30% bottom',
					//markers: true
				},
				opacity: 0,
				y: 70,
				ease: 'power3.out',
			}, '+=0.2')
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
  overflow-y: auto;
  padding-top: 60px;
  padding-bottom: 5rem;
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
	bottom: 0;
	//height: 100vh;
	background: $projects-project--color-bg;

	.image {
    position: relative;
    height: 0;
    padding-bottom: 56.25%;
	}
	
  .redirect-icon {
		margin-left: 0.5rem;
    margin-top: 0.2rem;
    @extend %clickable;
		transition: margin 0.4s ease;
  }
	.redirect:hover .redirect-icon { margin-left: 13px; }
}
</style>
