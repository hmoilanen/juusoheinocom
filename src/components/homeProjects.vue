<template>
  <div class="home-projects">
    <app-content-wrapper>
      <editable-content path="home.projects" #default="{ content }">
        <app-title class="gsap--home-projects--title">{{ content[`title-${$app.locale()}`] }}</app-title>
        <base-link :to="{ name: 'projects' }">
          <base-flex class="gsap--home-projects--title" center="y">
            <base-title :size="7">{{ content[`link-${$app.locale()}`] }}</base-title>
            <base-icon class="redirect">redirect</base-icon>
          </base-flex>
        </base-link>
      </editable-content>
      
      <!-- <div class="grid" :style="styling">
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
      </div> -->
    </app-content-wrapper>
  </div>
</template>

<script>
import appContentWrapper from '@/components/appContentWrapper'
import editableContent from '@/components/editableContent'
import appTitle from '@/components/appTitle'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'homeProjects',

  components: {
    appContentWrapper,
    editableContent,
    appTitle
  },

  mounted() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.home-projects',
				start: 'top center',
				//markers: true,
				//toggleActions: 'restart reset reset reset'
			}
		})

		tl
			.from('.gsap--home-projects--title', {
				stagger: 0.2,
				duration: 0.5,
				y: 70,
				opacity: 0,
				ease: 'Power3.out'
			})
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
$home-projects--color-hl: $app-color--hl;

.home-projects {
	@extend %home-sections--default-style;

  .redirect {
    margin-left: 0.5rem;
    margin-top: -0.1rem;
    @extend %clickable;
    color: $home-projects--color-hl;
  }
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
  //.base-link:hover .base-text { color: $home-projects--color-hl; }
  .base-link:hover {
    &,
    & .base-text { color: $home-projects--color-hl; }
  }
}
</style>
