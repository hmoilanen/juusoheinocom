<template>
  <div class="home-hero">
    <app-content-wrapper>

      <editable-content path="home.hero" #default="{ content }">
        <base-title class="my-name gsap--home-hero" :size="7">{{ content.pretitle }}</base-title>
        <base-title
					class="gsap--home-hero"
          :size="18"
          :scaling="true"
        >{{ content[`title-${locale}`] }}</base-title>

        <base-flex class="gsap--home-hero" justify="start" m-t="l">
          <base-wrapper max-width="paragraph" :disable-margins="true">
            <app-text :scaling="0.8" >{{ content[`text-${locale}`] }}</app-text>
          </base-wrapper>
        </base-flex>

				<base-flex :m-t="12">
					<base-link to="projects" class="gsap--home-hero" m-r="m">
						<base-button :highlight="true">{{ content[`link1-${locale}`] }}</base-button>
					</base-link>
					<base-link to="contact" class="gsap--home-hero">
						<base-button :highlight="true">{{ content[`link2-${locale}`] }}</base-button>
					</base-link>
				</base-flex>
      </editable-content>

    </app-content-wrapper>
  </div>
</template>

<script>
import AppContentWrapper from '@/components/AppContentWrapper'
import EditableContent from '@/components/EditableContent'
import AppText from '@/components/AppText'
import { gsap } from 'gsap'

const tl = gsap.timeline({ paused: true })

export default {
  name: 'HomeHero',

  components: {
    AppContentWrapper,
    EditableContent,
    AppText
	},
	
	mounted() {
		tl.from('.gsap--home-hero', {
			stagger: 0.2,
			duration: 0.6,
			y: 70,
			opacity: 0,
			ease: 'Power2.out'
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
    locale() {
      return this.$app.locale()
    }
  }
}
</script>

<style lang="scss" scoped>
$home-hero--color: $app-color--theme;
$home-hero--color-hl: $app-color--hl;

.home-hero {
	@extend %absolute-0000;
  display: flex;
	align-items: center;
	
	.app-content-wrapper { flex: 1; }
	.my-name { color: $home-hero--color-hl; }
}
</style>
