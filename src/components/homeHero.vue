<template>
  <div class="home-hero">
    <app-content-wrapper>
      <editable-content path="home.hero" #default="{ content }">
        <base-title class="name gsap--home-hero" :size="7">{{ content.pretitle }}</base-title>
        <!-- <base-title
					class="text-shadow gsap--home-hero"
          :size="17"
          :scaling="true"
        >{{ content[`title-${locale}`] }}</base-title> -->
        <base-title
					class="gsap--home-hero"
          :size="17"
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
				<!-- <div class="links gsap--home-hero">
					<base-link to="projects" m-r="s">
						<base-button :highlight="true">{{ content[`link1-${locale}`] }}</base-button>
					</base-link>
					<base-link to="contact">{{ content[`link2-${locale}`] }}</base-link>
				</div> -->
      </editable-content>
    </app-content-wrapper>
  </div>
</template>

<script>
import appContentWrapper from '@/components/appContentWrapper'
import editableContent from '@/components/editableContent'
import appText from '@/components/appText'
import { gsap } from 'gsap'

const tl = gsap.timeline({ paused: true })

export default {
  name: 'homeHero',

  components: {
    appContentWrapper,
    editableContent,
    appText
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
  /* .base-title,
  .base-text {
    &:not(.black) {
      //color: $home-hero--color;
    }
	} */
	.name { color: $home-hero--color-hl; }
	//.links { color: $home-hero--color-hl; }
	
	/* .text-shadow {
		position: absolute;
		transform: translate(4px, 3px);
		color: rgba(120, 120, 120, 0.4);
	} */
}
</style>
