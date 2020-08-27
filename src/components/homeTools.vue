<template>
	<editable-content path="home.tools.main" #default="{ content }">
		<home-section class="home-tools" :header="content[`title-${$app.locale()}`]">

			<base-wrapper max-width="paragraph">
				<app-text
					class="gsap--home-tools--text"
					:size="6.5"
					:scaling="0.5"
					:m-b="30"
				>{{ content[`text-${$app.locale()}`] }}</app-text>
				<div class="grid">
					<div
						class="tool gsap--home-tools--tool"
						v-for="(tool, key) in tools"
						:key="key"
					>
						<base-icon size="xl">{{ key }}</base-icon>
						<base-title :size="4" :truncate="true">
							{{ tool.title }}
							<span v-if="!tool.advanced">*</span>
						</base-title>
					</div>
				</div>

				<base-title class="gsap--home-tools--note" :size="4" m-t="xl">
					<span>*</span> : {{ content[`nb-${$app.locale()}`] }}
				</base-title>
			</base-wrapper>

		</home-section>
	</editable-content>
</template>

<script>
import EditableContent from '@/components/EditableContent'
import HomeSection from '@/components/HomeSection'
import AppText from '@/components/AppText'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'HomeTools',

  components: {
		EditableContent,
		HomeSection,
		AppText
  },

  props: {
    textSize: [String, Number]
	},

	mounted() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.gsap--home-tools--text',
				start: 'top 85%',
				//markers: true,
				//toggleActions: 'play reset reset reset'
			}
		})

		tl
			.from('.gsap--home-tools--text', {
				stagger: 0.2,
				duration: 0.8,
				y: 50,
				opacity: 0,
				ease: 'Power2.out'
			})
			.from('.gsap--home-tools--tool', {
				stagger: 0.04,
				duration: 0.6,
				y: -10,
				opacity: 0,
				ease: 'Back.easeOut.config(1.7)'
			}, 0.7)
			.from('.gsap--home-tools--note', {
				duration: 0.4,
				delay: 0.2,
				opacity: 0,
				y: 10,
				ease: 'Power2.out'
			})
	},

  computed: {
    tools() {
			let reorderedTools = {}
			const { main, order, ...tools} = this.$store.state.content.home.tools

			for (let tool of order) {          
				reorderedTools[tool] = tools[tool]
			}

			return reorderedTools
    }
  }
}
</script>

<style lang="scss" scoped>
$color--tools-asterisk: $app-color--hl;

.home-tools {
  .grid {
    //margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    grid-column-gap: 0.6rem;
    grid-row-gap: 0.6rem;
  }
  .tool {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .base-icon { margin-bottom: 0.5rem; }
  }
  .base-title {
    span {
      font-size: 1.3em;
      color: $color--tools-asterisk;
    }
  }
}
</style>
