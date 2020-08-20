<template>
  <div class="home-projects">
    <app-content-wrapper>
      
			<editable-content path="home.projects" #default="{ content }">
				<base-flex class="gsap--home-projects--title" center="y">
        	<app-title>{{ content[`title-${$app.locale()}`] }}</app-title>
					<base-icon
						class="shuffle"
						@click="newRandomProject"
						:only-stroke="true"
					>shuffle</base-icon>
				</base-flex>
			</editable-content>

			<!-- PÄÄTÄ MITÄ TÄLLE TEHDÄÄN KUN LAYOUT ON VALMIS -> TULEEKO KÄYTTÖÖN VAI MENEEKÖ ROSKIIN ?! -->
			<!-- <base-flex class="gsap--home-projects--title">
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
			</base-flex> -->

			<div class="gsap--home-projects--project">
				<base-title
					:size="7"
					:scaling="1"
					:m-t="10"
				>{{ randomProject[`title-${$app.locale()}`] }}</base-title>
				<base-title
					:size="4"
					:scaling="1"
				>{{ randomProject[`type-${$app.locale()}`] }}, {{ randomProject.year }}</base-title>
			</div>

			<base-wrapper class="gsap--home-projects--project" maxWidth="medium" :m-t="20">
				<content-carousel :key="randomProject.id">
					<content-carousel-item
						v-for="(image, index) in randomProject.images"
						:key="index"
						:image="imageSource(image)"
						:clickable="true"
						@click="goToCurrentProject"
					></content-carousel-item>
				</content-carousel>
			</base-wrapper>

    </app-content-wrapper>
  </div>
</template>

<script>
import appContentWrapper from '@/components/appContentWrapper'
import editableContent from '@/components/editableContent'
import contentCarousel from '@/components/contentCarousel'
import contentCarouselItem from '@/components/contentCarouselItem'
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
		contentCarouselItem,
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
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.home-projects',
				start: 'top center',
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
			.from('.gsap--home-projects--project', {
				stagger: 0.2,
				duration: 0.6,
				y: 70,
				opacity: 0,
				ease: 'Power3.out'
			}, 1)
	},

  computed: {
    randomProject() {
			const { main, ...projects } = this.$store.state.content.projects
			const keys = Object.keys(projects)
			const project = Object.assign(
				{},
				projects[keys[this.randomProjectIndex]],
				{ id: keys[this.randomProjectIndex] }
			)

			return project
    }
  },

  methods: {		
		imageSource(image) {
      const imageURL = this.$store.getters['app/GET_URL'].imageURL
      return `${imageURL}projects/${this.randomProject.id}/${image}`
		},

		goToCurrentProject() {
			this.$router.push({ name: 'project', params: { id: this.randomProject.id } })
		},

		newRandomProject() {
			let newIndex = randomIntegerFromInterval(0, 2) //DUMMY!
			//TUDUU: TÄMÄ TULEEE TILALLE KUN KUVAT LAITETTU KAANTAAN:
			//let newIndex = randomIntegerFromInterval(0, keys.length - 1)

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
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;

	.app-content-wrapper { width: 100%; }
	.app-title { margin-bottom: 0; }
	.shuffle { @extend %clickable; }
  .redirect {
    margin-left: 0.5rem;
    margin-top: -0.1rem;
    @extend %clickable;
    color: $home-projects--color-hl;
	}
}
</style>
