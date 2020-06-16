<template>
  <base-view class="view-gallery">
    <google-map :zoom="12" mapStyle="light"></google-map>

    <template v-if="content">
      <ul class="galleries">
        <li
          v-for="(gallery, index) in content.galleries"
          :key="index"
          @click="choosegallery(gallery)"
        >{{ gallery }}</li>
      </ul>

      <base-button
        v-if="$api.isLogged()"
        @click="addImage"
      >{{ this.buttonText }}</base-button>
      <content-carousel :amount="content.amount">
        <base-image
          v-for="(image, index) in content.images"
          :key="image + index"
          :src="image"
        ></base-image>
      </content-carousel>

      <div class="joo">{{this.currentGallery}}</div>
    </template>

  </base-view>
</template>


<script>
import googleMap from '@/components/googleMap'
import contentCarousel from '@/components/contentCarousel'
import { randomString } from '@/utils/strings'

export default {
  name: 'viewGallery',

  components: {
    googleMap,
    contentCarousel
  },

  data() {
    return {
      currentGallery: 'india'
    }
  },

  computed: {
    content() {
      if (!this.$store.state.app.isLoading) {
        let galleries = Object.keys(this.$store.state.content.gallery)
        let currentGallery = this.$store.state.content.gallery[this.currentGallery]
        let imageURL = this.$store.getters['app/GET_URL'].imageURL
        let routeName = this.$route.name
        let images = []
  
        for (let image in currentGallery) {
          let URL = `${imageURL}${routeName}/${this.currentGallery}/${currentGallery[image]}`
          images.push(URL)
        }
  
        return {
          galleries: galleries,
          images: images,
          amount: images.length || 0
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
    @extend %disabled;
    @extend %absolute-0000;
    height: 100vh; //MUUTTUU!?
  }

  .galleries {
    position: relative;
    display: flex;
    li { margin-right: 1rem; }
  }
}

</style>