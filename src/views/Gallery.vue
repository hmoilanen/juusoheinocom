<template>
  <base-view class="view-gallery">
    <template v-if="!$app.isLoading()">
      <google-map
        :places="countries.places"
        :zoom="countries.zoom"
        mapStyle="light"
      ></google-map>

      <editable-content path="gallery.main" #default="{ content }">
        <base-title>{{ content[`title-${$app.locale()}`] }}</base-title>
        <base-text>{{  content[`text-${$app.locale()}`] }}</base-text>
      </editable-content>

      <div class="galleries">
        <div
          v-for="(gallery, index) in content.countries"
          :key="index"
          @click="choosegallery(gallery)"
        >{{ gallery }}</div>
      </div>

      <base-button
        v-if="$app.isLogged()"
        @click="addImage"
      >{{ this.buttonText }}</base-button>
      <!-- <content-carousel :amount="content.amount">
        <base-image
          v-for="(image, index) in content.images"
          :key="image + index"
          :src="image"
        ></base-image>
      </content-carousel> -->

      <div class="joo">{{this.currentGallery}}</div>
      <div>{{this.content.coords}}</div>
    </template>

  </base-view>
</template>


<script>
import editableContent from '@/components/editableContent'
import googleMap from '@/components/googleMap'
import contentCarousel from '@/components/contentCarousel'
import { randomString } from '@/utils/strings'
import { randomIntegerFromInterval } from '@/utils/math'
import { countries } from '@/api/countries'

export default {
  name: 'viewGallery',

  components: {
    editableContent,
    googleMap,
    contentCarousel
  },

  data() {
    return {
      currentGallery: 'hongkong'
    }
  },

  /* created() {
    console.log(this.$app.isLoading())

    setTimeout(() => {
      console.log(this.$app.isLoading())
    }, 4000);
  }, */

  /* async mounted() {
    setTimeout(() => {
      for (let country in countries) {
        let info = countries[country]
        let opj = {
          info: info
        }
        //console.log('opj', opj);
        this.$api.updateData('gallery', country, opj)
      }
    }, 5000);
  }, */

  watch: {
    '$store.state.app.isLoading': {
      immedate: true,
      handler(newValue) {
        if (newValue === false) {
          const countries = Object.keys(this.$store.state.content.gallery)
          this.currentGallery = countries[randomIntegerFromInterval(0, countries.length)]
        }
      }
    }
  },

  computed: {
    countries() {
      if (!this.$app.isLoading()) {
        const { main, ...gallery } = this.$store.state.content.gallery
        let listOfCountries = []

        for (let country in gallery) {
          listOfCountries.push({
            name: country,
            position: {
              lat: gallery[country].info.latitude,
              lng: gallery[country].info.longitude
            }
          })
        }

        return {
          places: listOfCountries,
          zoom: gallery[this.currentGallery].info.zoom
        }
      } else return null
    },

    images() {
      if (this.countries) {
        return this.countries[this.currentCountry]
      } else return null
    },
    
    content() {
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
    },

    buttonText() {
      return this.$store.state.app.locale === 'en'
        ? 'add image'
        : 'lisää kuva'
    }
  },

  methods: {
    choosegallery(gallery) {
      this.currentGallery = gallery
    },

    addImage() {
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

  .google-map {
    z-index: -1;
    //@extend %disabled;
    @extend %absolute-0000;
    height: 100vh; //MUUTTUU!?
  }

  .galleries {
    position: relative;
    display: flex;
    div {
      margin-right: 0.5rem;
      padding: 0.3rem 0.5rem;
      background: white;
      border: 1px solid black;
      font-size: 0.6rem;
    }
  }

  .content-carousel {
    opacity: 0.2;
  }
}

</style>