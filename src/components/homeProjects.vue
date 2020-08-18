<template>
  <div class="home-projects">
    <app-content-wrapper>
      <editable-content path="home.projects" #default="{ content }">
        <app-title class="gsap--home-projects--title">{{ content[`title-${$app.locale()}`] }}</app-title>
        <base-link :to="{ name: 'projects' }">
          <base-flex class="gsap--home-projects--title" center="y">
            <!-- <base-title :size="7">{{ content[`link-${$app.locale()}`] }}</base-title>
            <base-icon class="redirect" :only-stroke="true">redirect</base-icon> -->
          </base-flex>
        </base-link>
      </editable-content>

			<base-wrapper maxWidth="medium">
				<base-title :size="7" :scaling="1">{{ randomProject[`title-${$app.locale()}`] }}</base-title>
				<base-title :size="5" :scaling="1">{{ randomProject[`type-${$app.locale()}`] }}, {{ randomProject.year }}</base-title>
				<content-carousel :key="randomProject.id">
					<div
						v-for="(image, index) in randomProject.images"
						:key="image + index"
						class="image"
						@click="goToCurrentProject"
					>
						<base-bg :source="imageSource(image)" fit="contain"></base-bg>
					</div>
				</content-carousel>

				<base-flex :m-t="12">
					<base-link :to="{ name: 'projects' }">
						<base-flex>
							<base-icon :only-stroke="true">redirect</base-icon>
							<base-title :size="6" :m-l="4">to projects</base-title>
						</base-flex>
					</base-link>
					<base-flex @click="newRandomProject" class="shuffle">
						<base-icon :only-stroke="true">shuffle</base-icon>
						<base-title :size="6" :m-l="4">shuffle</base-title>
					</base-flex>
				</base-flex>
			</base-wrapper>

			<!-- <base-icon class="go-to-projects" :size="34">goto</base-icon> -->
      
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
import contentCarousel from '@/components/contentCarousel'
import appTitle from '@/components/appTitle'
import { randomIntegerFromInterval } from '@/utils/math'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'homeProjects',

  components: {
		appContentWrapper,
		contentCarousel,
    editableContent,
    appTitle
	},

	data() {
		return {
			randomProjectIndex: 0
		}
	},
	
	created() {
		this.newRandomProject()
	},

  mounted() {
		/* for (let i = 3; i < 10; i++) {
			const index = randomIntegerFromInterval(0, i)
			console.log(index);
		} */

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
        const { main, ...projects } = this.$store.state.content.projects        
        return projects
      } else return null
		},
		
    randomProject() {
			//const index = randomIntegerFromInterval(0, keys.length - 1)
			//const index = randomIntegerFromInterval(0, 2) //DUMMY!

			const keys = Object.keys(this.projects)
			const project = Object.assign(
				{},
				this.projects[keys[this.randomProjectIndex]],
				{ id: keys[this.randomProjectIndex] }
			)

			return project
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
    /* bgSource(key, imageName) {
      let imageURL = this.$store.getters['app/GET_URL'].imageURL
      return `${imageURL}projects/${key}/${imageName}`
		}, */
		
		imageSource(image) {
      const imageURL = this.$store.getters['app/GET_URL'].imageURL
      return `${imageURL}projects/${this.randomProject.id}/${image}`
		},

		goToCurrentProject() {
			this.$router.push({ name: 'project', params: { id: this.randomProject.id } })
		},

		newRandomProject() {
			let newIndex = randomIntegerFromInterval(0, 2) //DUMMY!

			while (newIndex === this.randomProjectIndex) {
				newIndex = randomIntegerFromInterval(0, 2)
			}
			
			this.randomProjectIndex = newIndex
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
    &, & .base-text { color: $home-projects--color-hl; }
	}

	.image {
		position: relative;
    height: 0;
		padding-bottom: 56.25%;
		@extend %clickable;
		&:hover { opacity: 0.8; }
		//max-width: calc(100vw - (2 * 1rem));
	}

	.shuffle {
		@extend %clickable;
		margin-left: 0.8rem; 
	}
	
	/* .go-to-projects {
		@extend %icon--only-stroke;
		stroke-width: 2px;
		//stroke: black;
	} */
}
</style>
