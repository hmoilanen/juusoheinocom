<template>
  <base-view class="view-projects" content-padding-y="y">
    <app-content-wrapper>
      <!-- <template v-if="!$app.isLoading()"> -->
        <editable-content path="projects.main" #default="{ content }">
          <app-title class="gsap--view-projects--title">{{ content[`title-${$app.locale()}`] }}</app-title>
          <app-text class="gsap--view-projects--title" :m-b="25">
						{{ content[`text-${$app.locale()}`] }}
					</app-text>
        </editable-content>
      
        <base-button v-if="$app.isLogged()" @click="addProject">{{ this.buttonText }}</base-button>

        <div class="grid">
          <projects-item
            v-for="(project, key) in projects"
            :key="key"
            :item="project"
            @click.native="showcaseProject(key)"
          ></projects-item>
        </div>

				<router-view></router-view>

      <!-- </template> -->
    </app-content-wrapper>
  </base-view>
</template>


<script>
import appContentWrapper from '@/components/appContentWrapper'
import appTitle from '@/components/appTitle'
import appText from '@/components/appText'
import editableContent from '@/components/editableContent'
import projectsItem from '@/components/projectsItem'
import projectsProject from '@/components/projectsProject'
import { isImage } from '@/utils/regex'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const tl = gsap.timeline({ paused: true })

export default {
  name: 'viewProjects',

  components: {
    appContentWrapper,
    appTitle,
    appText,
    editableContent,
    projectsItem,
    projectsProject
	},

	mounted() {
		tl
			.from('.gsap--view-projects--title', {
				stagger: 0.2,
				duration: 0.8,
				y: 70,
				opacity: 0,
				ease: 'Power3.out'
			}, 0.25)

		gsap.utils.toArray('.projects-item').forEach(item => {
			item.style.visibility = 'hidden'
		})
	},
	
	watch: {
		'$store.state.ui.curtainDisplayed': {
			immediate: true,
			handler(newValue, oldValue) {
				if (newValue === false) {
					tl.restart() // For playing the animation also when returned to the page
					
					setTimeout(() => {
						ScrollTrigger.batch('.projects-item', {
							once: true,
							start: '30% bottom',
							onEnter: batch => {
								gsap.fromTo(batch, {
									autoAlpha: 0,
									y: 70
								}, {
									//delay: 1.5,
									duration: 0.6,
									stagger: 0.3,
									autoAlpha: 1,
									y: 0
								})
							}
						})
					}, 1500)
				}
			}
		}
	},

  computed: {
    projects() {
      let locale = this.$app.locale()
      if (!this.$store.state.app.isLoading) {
        let { main, ...projects } = this.$store.state.content.projects
        return projects
      }
      return {}
    },

    buttonText() {
      return this.$store.state.app.locale === 'en'
        ? 'add project'
        : 'lisää projekti'
    }
  },

  methods: {
    showcaseProject(key) {      
      this.$router.push({ name: 'project', params: { id: key } })
    },

    addProject() {
      let ids = Object.keys(this.projects)
      let data = {
        'title-en': '',
        'title-fi': '',
        'text-en': '',
        'text-fi': '',
        year: '',
        bg: '.png'
      }

      // If there is at least one project in database, create data object based on it.
      if (ids.length > 0) {
        data = {}
        for (let key in this.projects[ids[0]]) {
          data[key] = isImage.test(this.projects[ids[0]][key]) ? '.png' : ''
        }
      }

      console.log('Projects.vue - currently adding new project')
      this.$store.dispatch('modals/SET_MODAL', {
        active: 'editContent',
        data: { content: data, path: this.$route.name }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.view-projects {
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		grid-gap: 1rem;
		
  }
}

@media only screen and (min-width: 800px) {
	.view-projects .grid {
		grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
	}
}
</style>