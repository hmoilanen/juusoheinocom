<template>
	<editable-content path="home.projects" #default="{ content }">
		<home-section
			class="home-projects"
			:header="content[`title-${$app.locale()}`]"
			:forProject="true"
		>
			<content-carousel class="gsap--home-project">
				<content-carousel-item
					v-for="(image, index) in randomProject.images"
					:key="index"
					:image="imageSource(image)"
					@item-clicked="jeejee"
				></content-carousel-item>
			</content-carousel>
		</home-section>
	</editable-content>
</template>

<script>
import EditableContent from '@/components/EditableContent'
import HomeSection from '@/components/HomeSection'
import ContentCarousel from '@/components/ContentCarousel'
import ContentCarouselItem from '@/components/ContentCarouselItem'
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
		ContentCarouselItem
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
		const headerElement = '.gsap--home-project'

		gsap.fromTo(headerElement, {
			autoAlpha: 0,
			y: 70,
		}, {
			scrollTrigger: {
				trigger: headerElement,
				start: 'top 90%',
			},
			duration: 1.2,
			autoAlpha: 1,
			y: 0,
			ease: 'power2.out',
		})
	},

  computed: {
    randomProject() {
			const project = this.projectIds[this.randomProjectIndex]
			const sortedImages = [...this.projects[project].images]
			console.log('sortedImages', sortedImages);
			sortedImages.splice(-1, 1)
			console.log('sortedImages2', sortedImages);
			const randomProject = Object.assign(
				{},
				this.projects[project],
				{
					id: project,
					images: sortedImages
				}
			)

			return randomProject
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
		},

		jeejee() {
			console.log('klikattu');
		}
  }
}
</script>

<style lang="scss" scoped>
$home-projects--color-hl: $app-color--hl;

.home-projects {
	.shuffle { @extend %clickable; }
  .redirect {
    margin-left: 0.5rem;
    margin-top: -0.1rem;
    @extend %clickable;
    color: $home-projects--color-hl;
	}
}
</style>
