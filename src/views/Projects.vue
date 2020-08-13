<template>
  <base-view class="view-projects" content-padding-y="y">
    <app-content-wrapper>
      <template v-if="!$app.isLoading()">
        <editable-content path="projects.main" #default="{ content }">
          <app-title class="gsap--view-projects--title">{{ content[`title-${$app.locale()}`] }}</app-title>
          <app-text class="gsap--view-projects--title" :m-b="25">{{ content[`text-${$app.locale()}`] }}</app-text>
        </editable-content>
      
        <base-button v-if="$app.isLogged()" @click="addProject">{{ this.buttonText }}</base-button>

        <!-- <base-spacer :size="20" m-t="xl"> -->
        <div class="grid">
          <projects-item
            v-for="(project, key) in projects"
            :key="key"
            :item="project"
            @click.native="showcaseProject(key)"
          ></projects-item>
        </div>
        <!-- </base-spacer> -->

        <!-- <projects-project v-if="$route.name === 'project'"></projects-project> -->
				<router-view></router-view>
      </template>
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
	},
	
	watch: {
		'$store.state.ui.curtainDisplayed': {
			immediate: true,
			handler(newValue, oldValue) {
				if (newValue === false) {
					tl.restart() // For playing the animation also when returned to the page
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
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    grid-gap: 1rem;
  }
}
</style>