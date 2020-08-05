<template>
  <base-view class="view-gallery">
    <template v-if="!$app.isLoading()">
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

      <!-- <editable-content path="gallery.main" #default="{ content }">
        <base-title>{{ content[`title-${$app.locale()}`] }}</base-title>
        <base-text>{{  content[`text-${$app.locale()}`] }}</base-text>
      </editable-content> -->

      <!-- <base-button
        v-if="$app.isLogged()"
        @click="addImage"
      >{{ this.buttonText }}</base-button> -->
    </template>

  </base-view>
</template>


<script>
//JOS MITÄÄN ALUETTA EI OLE VALITTUNA, ZOOMAA KARTTA NIIN ETTÄ KAIKKI MAAT NÄKYY (TAI AIINAKIN SUURIIN OSA)
//TEE "MAP"-NAPPI -> KUN PAINETAAN, PILOTA KARUSELLI JA ZOOMA TAKAISIN KOKONAISTILANTEESEEN
//TE TARKASTELU JA ANNA ZOOMI AINA DYNAAMISESTI RIIPPUEN SIITÄ, MINKÄ KOKOINEN VEWPORT ON
  //-> see: https://developers.google.com/maps/documentation/javascript/events
    //-> map.fitBounds(bounds); ...
//PILOTA KARTAN ZOOMINAPIT JA TERMSOFSERVICET JNE.

//import editableContent from '@/components/editableContent'
import googleMap from '@/components/googleMap'
import appContentWrapper from '@/components/appContentWrapper'
import contentCarousel from '@/components/contentCarousel'
import { randomString } from '@/utils/strings'
import { randomIntegerFromInterval } from '@/utils/math'
//import { countries } from '@/api/countries'

export default {
  name: 'viewGallery',

  components: {
    //editableContent,
    googleMap,
    appContentWrapper,
    contentCarousel
  },

  data() {
    return {
			currentGallery: '',
			mapIsCentered: false
    }
  },

  created() {
    const galleryQuery = this.$route.query.gallery
    if (galleryQuery) {
      this.currentGallery = galleryQuery
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
    }
    /* '$store.state.app.isLoading': {
      immedate: true,
      handler(newValue) {
        if (newValue === false) {
          const countries = Object.keys(this.$store.state.content.gallery).filter(country => {
            return country !== 'main'
          })
          this.currentGallery = countries[randomIntegerFromInterval(0, countries.length)]
        }
      }
    } */
  },

  computed: {
    countries() {
      if (!this.$app.isLoading()) {
        const { main, ...gallery } = this.$store.state.content.gallery
        let listOfCountries = {}

        for (let country in gallery) {
          const { info, ...images } = gallery[country]
          /* listOfCountries.push({
            name: country,
            position: {
              lat: info.latitude,
              lng: info.longitude
            },
            zoom: info.zoom,
            images: images
          }) */
					//listOfCountries.push(info)

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
        /* let currentImages = this.countries.filter(country => {
          return country.name === this.currentGallery
				})[0].images */
				const currentImages = this.countries[this.currentGallery].images

        for (const image in currentImages) {
          currentImages[image] = `${imageURL}${this.$route.name}/${this.currentGallery}/${currentImages[image]}`
        }

        return currentImages
      } else return null
    },
    
    /* content() {
      if (!this.$app.isLoading()) {
        const gallery = this.$store.state.content.gallery
        let countries = Object.keys(gallery)
        let currentGallery = this.$store.state.content.gallery[this.currentGallery]
        let { info, ...images } = currentGallery
        let imageURL = this.$store.getters['app/GET_URL'].imageURL
        let routeName = this.$route.name
        let imageURLs = []
  
        for (let image in images) {
          let URL = `${imageURL}${routeName}/${this.currentGallery}/${currentGallery[image]}`
          imageURLs.push(URL)
        }
  
        return {
          countries: countries, // Array of all countries
          images: imageURLs, // Array of images of active country
          amount: imageURLs.length || 0, // Amount of images
          info: info,
          coords: [
            {
              name: info['name-en'],
              position: {
                lat: info.latitude,
                lng: info.longitude
              }
            }
          ]
        }
      } else return null
    }, */

    buttonText() { //OTA TAKAISIN KÄYTTÖÖN, KS. TEMPLATE!
      return this.$store.state.app.locale === 'en'
        ? 'add image'
        : 'lisää kuva'
    }
  },

  methods: {
		/* googleCenterMap() {
			this.$refs.googleMap.centerMap()
		}, */

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

    addImage() { //OTA TAKAISIN KÄYTTÖÖN, KS. TEMPLATE!
      let randomKey = 'image-' + randomString(6)
      let data = { [randomKey]: '.png' }
      let path = `${this.$route.name}.${this.currentGallery}`

      console.log('Gallery.vue - currently adding image to: ' + this.currentGallery)
      this.$store.dispatch('modals/SET_MODAL', {
        active: 'editContent',
        data: { content: data, path: path }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.view-gallery {
  position: relative;

  /* .google-map {
    @extend %absolute-0000;
    transition: opacity 1.2s ease-in-out;
    &.disabled {
      @extend %disabled;
      opacity: 0.1;
    }
  } */
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
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
    //background: rgba(200, 200, 200, 0.2);
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
			//border-radius: 50%;
			background: rgba(255, 255, 255, 0.75);
			display: flex;
			align-items: center;
			justify-content: center;
			@extend %clickable;
			transition: background 0.4s ease;
			&:hover { background: rgba(255, 255, 255, 0.95); }
			
			.base-icon {
				@extend %icon--only-stroke;
			}
		}
	}
}

$toggle-animation--duration: 0.2s;
.toggle-enter { transform: translateX(-100%); }
.toggle-leave-to { transform: translateX(-100%); }
.toggle-enter-active { transition: transform $toggle-animation--duration ease; }
.toggle-leave-active { transition: transform $toggle-animation--duration cubic-bezier(0.46, 0.07, 0.83, 0.45); }
</style>