<template>
	<editable-content path="home.projects" #default="{ content }">

		<home-section
			class="home-projects"
			:header="content[`title-${$app.locale()}`]"
		>
			<!-- #default="{ width }" -->
			<!-- <div class="testi"> -->
				<!-- <div class="testi2"> -->
				<!-- <base-wrapper maxWidth="medium" :style="{ width: width + 'px' }"> -->
					<!-- <div class="testi2">DIVI</div> -->
				<!-- <base-wrapper maxWidth="medium">
					<content-carousel :key="randomProject.id">
						<content-carousel-item
							v-for="(image, index) in randomProject.images"
							:key="index"
							:image="imageSource(image)"
							:clickable="true"
							@click="goToCurrentProject"
						></content-carousel-item>
					</content-carousel>
				</base-wrapper> -->
				<!-- </div> -->
			<!-- </div> -->

			<!-- <div style="padding: 0 2rem;">
				<div style="max-width:700px; min-height: 100px; background: pink;">
					<content-carousel :key="randomProject.id">
						<content-carousel-item
							v-for="(image, index) in randomProject.images"
							:key="index"
							:image="imageSource(image)"
							:clickable="true"
							@click="goToCurrentProject"
						></content-carousel-item>
					</content-carousel>
				</div>
			</div> -->

			<!-- <base-wrapper class="gsap--home-projects--project" maxWidth="medium"> -->
				<!-- <base-flex class="gsap--home-projects--title" center="y">
					<base-icon
						class="shuffle"
						@click="newRandomProject"
						:only-stroke="true"
					>shuffle</base-icon>
				</base-flex> -->

				<!-- <div class="gsap--home-projects--project">
					<base-title
						:size="7"
						:scaling="1"
						:m-t="10"
					>{{ randomProject[`title-${$app.locale()}`] }}</base-title>
					<base-title
						:size="4"
						:scaling="1"
					>{{ randomProject[`type-${$app.locale()}`] }}, {{ randomProject.year }}</base-title>
				</div> -->

				<!-- <div style="height: 100px; background: pink;"></div> -->

				<!-- <content-carousel :key="randomProject.id">
					<content-carousel-item
						v-for="(image, index) in randomProject.images"
						:key="index"
						:image="imageSource(image)"
						:clickable="true"
						@click="goToCurrentProject"
					></content-carousel-item>
				</content-carousel> -->
			<!-- </base-wrapper> -->
		</home-section>
	</editable-content>

  <!-- <div class="home-projects">
		<editable-content path="home.projects" #default="{ content }">
      <app-title>{{ content[`title-${$app.locale()}`] }}</app-title>
				
    	<app-content-wrapper>
				<base-flex class="gsap--home-projects--title" center="y">
					<base-icon
						class="shuffle"
						@click="newRandomProject"
						:only-stroke="true"
					>shuffle</base-icon>
				</base-flex>

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
		</editable-content>
  </div> -->
</template>

<script>
import EditableContent from '@/components/EditableContent'
import HomeSection from '@/components/HomeSection'
import ContentCarousel from '@/components/ContentCarousel'
import ContentCarouselItem from '@/components/ContentCarouselItem'
//import AppContentWrapper from '@/components/AppContentWrapper'
//import AppTitle from '@/components/AppTitle'
import { randomIntegerFromInterval } from '@/utils/math'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'HomeProjects',

  components: {
		EditableContent,
		HomeSection,
		ContentCarousel,
		ContentCarouselItem,
		//AppContentWrapper,
    //AppTitle
	},

	data() {
		return {
			randomProjectIndex: 0,
			projects: null,
			projectIds: [],
		}
	},
	
	created() {
		const { main, ...projects } = this.$store.state.content.projects

		this.projects = projects
		this.projectIds = Object.keys(projects)

		this.newRandomProject()
	},

  mounted() {
		/* const tl = gsap.timeline({
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
			}, 1) */
	},

  computed: {
    randomProject() {
			const projectId = this.projectIds[this.randomProjectIndex]
			const project = Object.assign(
				{},
				this.projects[projectId],
				{ id: projectId }
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
			const amount = this.projectIds.length - 1
			let newIndex = randomIntegerFromInterval(0, amount)

			while (newIndex === this.randomProjectIndex) {
				newIndex = randomIntegerFromInterval(0, amount)
			}
			
			this.randomProjectIndex = newIndex
		}
  }
}
</script>

<style lang="scss" scoped>
$home-projects--color-hl: $app-color--hl;

.home-projects {
	//.app-content-wrapper { width: 100%; }
	//.app-title { margin-bottom: 0; }
	.shuffle { @extend %clickable; }
  .redirect {
    margin-left: 0.5rem;
    margin-top: -0.1rem;
    @extend %clickable;
    color: $home-projects--color-hl;
	}

	.testi {
		//overflow: hidden;
		//display: flex;
		//align-items: stretch;
		min-height: 50px;
		//flex-direction: column;
		//max-width: 100%;
		//background: pink;
		//position: relative;
		//min-width: 200px;
		//max-width: 800px;
		//margin: 0 auto;
		//border: 1px solid red;
		.testi2 {
			//flex: 1;
			//width: 100%;
			background: rgba(255, 217, 0, 0.377);
			//sdisplay: flex;
			margin-bottom: 10px;
		}
		& > * { width: 100%; }


		//display: flex;
		//align-items: stretch;
		/* .base-wrapper {
			//flex: 1;
			position: relative;
			//width: 100%;
			//width: 50vw;
			display: flex;
			flex-direction: column;
			align-items: stretch;
			background: yellow;
		} */
	}
}
</style>
