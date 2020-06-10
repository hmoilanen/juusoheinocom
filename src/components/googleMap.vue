<template>
  <div class="google-map">
    <google-map-marker v-if="!hideMarkers" :places="places"></google-map-marker>
  </div>
</template>

<script>
// API key: AIzaSyCVrXF_Jh-nfPCeMYgYTkIPl3aP0o9HOyw
// HUOM! SIIRRÄ API-KEY STOREEN (AUTH)
// LISÄÄ MARGINS-MIXIN

// Google maps platform: https://cloud.google.com/maps-platform/
// Google maps options: https://developers.google.com/maps/documentation/javascript/reference?csw=1#MapTypeControlOptions
// Customize maps' visuals: https://mapstyle.withgoogle.com/

import googleMapMarker from '@/components/googleMapMarker'
import { googleMapStyles } from '@/utils/googleMapStyles'

export default {
  name: 'googleMap',

  /* head: { // KOITA SAADA TÄMÄ FUTAAMAAN NIIN EI TARVITSE ERIYTTÄÄ TOIMINNALLISUUTTA index.html:ÄÄN!
    script: [
      {
        type: 'text/javascript',
        src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCVrXF_Jh-nfPCeMYgYTkIPl3aP0o9HOyw&callback=initMap',
        async: true,
        defer: true,
      }
    ]
  }, */

  components: { googleMapMarker,},

  props: {
    places: {
      type: Array,
      default: () => {
        return [
          { // provide place props like this
            name: 'Koskipuisto',
            position: {
              lat: 61.499656,
              lng: 23.764980
            }
          }
        ]
      }
    },
    streetView: Boolean,
    hideMarkers: Boolean,
    zoom: {
      type: Number,
      default: 10
    },
    maxZoom: {
      type: Number,
      default: 20
    },
    minZoom: {
      type: Number,
      default: 1
    },
    mapTypes: Boolean,
    mapStyle: {
      type: String,
      validator: prop => {
        return ['light', 'dark', 'retro'].indexOf(prop) !== -1
      }
    }

  },

  provide() {
    return {
      getGoogleMap: this.getMap
    }
  },

  data() {
    return {
      map: null
    }
  },

  mounted() {
    this.handleMap()
  },

  methods: {
    handleMap() {
      this.map = new google.maps.Map(this.$el, {
        center: {
          lat: this.places[0].position.lat,
          lng: this.places[0].position.lng
        },
        zoom: this.zoom,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        streetViewControl: this.streetView, // = enable 3d street view
        mapTypeControl: this.mapTypes, // = default / satellite view
        styles: this.mapStyle ? googleMapStyles[this.mapStyle] : false
      })
    },

    getMap(marker) {
      let self = this

      function checkForMap() {
        if (self.map) {
          marker(self.map)
        } else {
          setTimeout(checkForMap, 50)
        }
      }

      checkForMap()
    }
  }
}
</script>

<style lang="scss" scoped>
.google-map {
  width: 100%;
  height: 400px;
  position: relative;
  overflow: hidden;
  padding: 1px;
  &::after {
    content: '';
    @extend %absolute-0000;
    //border: 1px solid black;
    pointer-events: none;
  }
}
</style>
