<template>
  <base-view class="view-gallery">

		<div class="map-container" :class="{ disabled: currentGallery }">
			<google-map
				ref="googleMap"
				:places="countries"
				:minZoom="3"
				:disableDefaultUi="true"
				mapStyle="light"
				@marker-clicked="chooseGallery($event)"
				@map-centered="trackMapPosition"
			></google-map>
			<transition name="toggle">
				<div v-if="!mapIsCentered" class="fit-container">
					<div class="fit" @click="centerMap">
						<base-icon :size="12">fill</base-icon>
					</div>
				</div>
			</transition>
		</div>

		<div v-if="!galleryIntroSeen" class="intro gsap--view-gallery--intro">
			<div class="tiles" :style="styling">
				<div
					class="tile gsap--view-gallery--tile"
					v-for="tile in luku * luku"
					:key="tile"
				></div>
			</div>
			<base-wrapper max-width="paragraph">
				<editable-content path="gallery.main" #default="{ content }">
					<app-text class="gsap--view-gallery--intro-text">{{ content[`text-${$app.locale()}`] }}</app-text>
					<base-title
						class="skip gsap--view-gallery--intro-skip"
						@click="skipIntro"
						:center="true"
						:size="6"
						:m-t="30"
					>{{ content[`proceed-${$app.locale()}`] }}</base-title>
				</editable-content>
			</base-wrapper>
		</div>

		<div v-if="currentGallery" class="content-carousel-container">
			<app-content-wrapper>
				<content-carousel v-if="currentGallery" :key="currentGallery">
					<div
						v-for="(image, index) in images"
						:key="image + index"
						class="image"
					>
						<base-bg :source="image" fit="contain"></base-bg>
					</div>
				</content-carousel>
			</app-content-wrapper>
		</div>

		<!-- <base-button
			v-if="$app.isLogged()"
			@click="addImage"
		>{{ this.buttonText }}</base-button> -->
  </base-view>
</template>


<script>
import editableContent from '@/components/editableContent'
import googleMap from '@/components/googleMap'
import appContentWrapper from '@/components/appContentWrapper'
import contentCarousel from '@/components/contentCarousel'
import appTitle from '@/components/appTitle'
import appText from '@/components/appText'
import { randomString } from '@/utils/strings'
import { randomIntegerFromInterval } from '@/utils/math'
import { gsap } from 'gsap'

const tl = gsap.timeline({ paused: true })

export default {
  name: 'viewGallery',

  components: {
    editableContent,
    googleMap,
    appContentWrapper,
		contentCarousel,
		appTitle,
    appText
  },

  data() {
    return {
			introMinimumDuration: 4000,
			currentGallery: '',
			mapIsCentered: false,
			luku: 8
    }
  },

  created() {
    const galleryQuery = this.$route.query.gallery
    if (galleryQuery) {
      this.currentGallery = galleryQuery
    }
	},
	
	mounted() {
		if (!this.galleryIntroSeen) {
			tl
				.from('.gsap--view-gallery--intro-text', {
					duration: 0.5,
					y: 70,
					opacity: 0,
					ease: 'Power3.out'
				}, 0.25)
				.from('.gsap--view-gallery--intro-skip', {
					duration: 0.3,
					y: 10,
					opacity: 0,
					ease: 'Power3.out'
				}, 0.7)
		}
	},

  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(newValue) {
        if (!newValue.query.gallery) {
          this.currentGallery = ''
        }
      }
		},

		'$store.state.ui.curtainDisplayed': {
			immediate: true,
			handler(newValue, oldValue) {
				if (newValue === false && !this.galleryIntroSeen) {
					tl.restart() // For playing the animation also when returned to the page
				}
			}
		}
  },

  computed: {
		galleryIntroSeen() {
			return this.$store.state.ui.galleryIntroSeen
		},

    countries() {
      if (!this.$app.isLoading()) {
        const { main, ...gallery } = this.$store.state.content.gallery
        let listOfCountries = {}

        for (let country in gallery) {
          const { info, ...images } = gallery[country]
					const countryName = info['name-en'].toLowerCase().split(' ').join('')
					
					listOfCountries[countryName] = {
						...info,
						images
					}
        }

        return listOfCountries
      } else return null
    },

    images() {
      if (this.currentGallery) {
        const imageURL = this.$store.getters['app/GET_URL'].imageURL
				const currentImages = this.countries[this.currentGallery].images

        for (const image in currentImages) {
          currentImages[image] = `${imageURL}${this.$route.name}/${this.currentGallery}/${currentImages[image]}`
        }

        return currentImages
      } else return null
    },

    /* buttonText() { //OTA TAKAISIN KÄYTTÖÖN, KS. TEMPLATE!
      return this.$store.state.app.locale === 'en'
        ? 'add image'
        : 'lisää kuva'
		}, */

		styling() {
			return {
				gridTemplateColumns: `repeat(${this.luku}, 1fr)`,
				gridTemplateRows: `repeat(${this.luku}, 1fr)`
			}
		}
  },

  methods: {
		skipIntro() {
			gsap.to('.gsap--view-gallery--tile', {
				duration: 'random(0.05, 1.1)',
				opacity: 0,
				ease: 'power2.in',
				repeatRefresh: true,
				onComplete: () => {
					this.$store.dispatch('SET_STATE', { data: true, path: 'ui.galleryIntroSeen' })
				}
			})

			gsap.to('.gsap--view-gallery--intro-text, .gsap--view-gallery--intro-skip', {
				duration: 0.1,
				opacity: 0,
				ease: 'power2.in'
			})
		},

    chooseGallery(gallery) {
      if (gallery && this.currentGallery !== gallery) {
        this.currentGallery = gallery
        this.$router.push({ name: 'gallery', query: { gallery: gallery } })
      }
		},

		centerMap() {
			this.$refs.googleMap.fitMap()
		},
		
		trackMapPosition(state) {
			if (this.mapIsCentered !== state) {
				this.mapIsCentered = state
			}
		},

    /* addImage() { //OTA TAKAISIN KÄYTTÖÖN, KS. TEMPLATE!
      let randomKey = 'image-' + randomString(6)
      let data = { [randomKey]: '.png' }
      let path = `${this.$route.name}.${this.currentGallery}`

      console.log('Gallery.vue - currently adding image to: ' + this.currentGallery)
      this.$store.dispatch('modals/SET_MODAL', {
        active: 'editContent',
        data: { content: data, path: path }
      })
    } */
  }
}
</script>

<style lang="scss" scoped>
$view-gallery--color-bg--tile: $app-color--theme;

.view-gallery {
  position: relative;

  .intro {
		@extend %absolute-0000;
		display: flex;
		align-items: center;
		.skip {
			@extend %clickable;
			&:hover { color: $app-color--hl; }
		}
		.tiles {
			@extend %absolute-0000;
			display: grid;
			// grid-template-columns: ; // see: this.styling
			// grid-template-rows: ; // see: this.styling
			.tile {
				background: $view-gallery--color-bg--tile;
			}
		}
	}

  .map-container {
    @extend %absolute-0000;
		transition: opacity 1s ease-in-out;
		.google-map { @extend %absolute-0000; }
    &.disabled {
      @extend %disabled;
      opacity: 0.1;
    }
	}
	
  .content-carousel-container {
		@extend %absolute-0000;
    display: flex;
    align-items: stretch;
    justify-content: center;
  }
  .content-carousel {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .image {
    position: relative;
    height: 0;
    padding-bottom: 56.25%;
	}

	.fit-container {
		$fit-markers--size: 3rem;

		position: absolute;
		left: 0;
		bottom: 0;
		padding-left: 1rem;
		padding-bottom: 1rem;
		.fit {
			width: $fit-markers--size;
			height: $fit-markers--size;
			background: rgba(255, 255, 255, 0.75);
			display: flex;
			align-items: center;
			justify-content: center;
			@extend %clickable;
			transition: background 0.4s ease;
			&:hover { background: rgba(255, 255, 255, 0.95); }
			.base-icon { @extend %icon--only-stroke; }
		}
	}
}

$toggle-animation--duration: 0.2s;
.toggle-enter { transform: translateX(-100%); }
.toggle-leave-to { transform: translateX(-100%); }
.toggle-enter-active { transition: transform $toggle-animation--duration ease; }
.toggle-leave-active { transition: transform $toggle-animation--duration cubic-bezier(0.46, 0.07, 0.83, 0.45); }
</style>