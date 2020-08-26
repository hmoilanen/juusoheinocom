<template>
  <div class="home-tools">
    <app-content-wrapper>

			<editable-content path="home.tools.main" #default="{ content }">
				<app-title class="gsap--home-tools--title">{{ content[`title-${$app.locale()}`] }}</app-title>
				<app-text
					class="gsap--home-tools--title"
					:size="8"
					:m-b="40"
				>{{ content[`text-${$app.locale()}`] }}</app-text>
				
				<base-wrapper max-width="460px">
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
			</editable-content>

    </app-content-wrapper>
  </div>
</template>

<script>
import AppContentWrapper from '@/components/AppContentWrapper'
import EditableContent from '@/components/EditableContent'
import AppTitle from '@/components/AppTitle'
import AppText from '@/components/AppText'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'HomeTools',

  components: {
    AppContentWrapper,
    EditableContent,
    AppTitle,
    AppText
  },

  props: {
    textSize: [String, Number]
	},

	mounted() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.home-tools',
				start: '75% bottom'
			}
		})

		tl
			.from('.gsap--home-tools--title', {
				stagger: 0.2,
				duration: 0.5,
				y: 70,
				opacity: 0,
				ease: 'Power3.out'
			})
			.from('.gsap--home-tools--tool', {
				stagger: 0.04,
				duration: 0.6,
				y: -10,
				opacity: 0,
				ease: 'Back.easeOut.config(1.7)'
			}, 1)
			.from('.gsap--home-tools--note', {
				duration: 0.4,
				opacity: 0,
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
	min-height: 100vh;
	display: flex;
  align-items: center;
	justify-content: center;

	.app-content-wrapper { flex: 1; }

  .grid {
    margin-top: 2rem;
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
