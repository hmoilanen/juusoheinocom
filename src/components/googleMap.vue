<template>
  <div class="google-map"></div>
</template>

<script>
// API key: AIzaSyCVrXF_Jh-nfPCeMYgYTkIPl3aP0o9HOyw

// Google maps platform: https://cloud.google.com/maps-platform/
// Google maps options: https://developers.google.com/maps/documentation/javascript/reference?csw=1#MapTypeControlOptions
// Customize maps' visuals: https://mapstyle.withgoogle.com/
// Customise markers, see: https://developers.google.com/maps/documentation/javascript/custom-markers
// Customize markers - complex icons: https://developers.google.com/maps/documentation/javascript/examples/icon-complex

import { googleMapStyles } from '@/utils/googleMapStyles'
import { countries } from '@/api/countries'

export default {
  name: 'googleMap',

  props: {
    places: {
      type: Array,
      default: () => {
        return [{ // Provide (array of) place props like this.
          name: 'Koskipuisto',
          position: { lat: 61.499656, lng: 23.764980 }
        }]
      }
    },
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
    hideMarkers: Boolean, //POISTUUKO MYÖS KUN MARKER EI OLE ENÄÄ ERILLINEN KOMPONENTTI?!?!
    streetView: Boolean, // Enable 3d street view
    mapTypes: Boolean, // Default / satellite view
    disableDefaultUi: Boolean,
    mapStyle: {
      type: String,
      validator: prop => {
        return ['light', 'dark', 'retro'].indexOf(prop) !== -1
      }
    }
  },

  mounted() {
    this.initMap()
    this.$on('hook:updated',() => {
      this.initMap()
    })
  },

  methods: {
    initMap() {
      const map = new google.maps.Map(this.$el, {
        center: {
          lat: this.places[0].position.lat,
          lng: this.places[0].position.lng
        },
        zoom: this.places[0].zoom,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        styles: this.mapStyle ? googleMapStyles[this.mapStyle] : false,
        // Map control UI:
        //zoomControl: boolean,
        mapTypeControl: this.mapTypes,
        //scaleControl: boolean,
        streetViewControl: this.streetView,
        //rotateControl: boolean,
        //fullscreenControl: boolean
        disableDefaultUI: this.disableDefaultUi
      })

      if (!this.hideMarkers) {
        this.setMarkers(map)
      }
    },

    setMarkers(map) {
      let markerURL = this.$store.getters['app/GET_URL'].imageURL + 'gallery/markers/'
      let markerSize = 40 //DUMMY!

      for (let key in countries) {
        let country = countries[key]
        let marker = new google.maps.Marker({
          position: { lat: country.latitude, lng: country.longitude },
          map: map,
          icon: {
            url: markerURL + key + '.svg',
            size: new google.maps.Size(markerSize, markerSize), // The marker is 50px wide by 50px high.
            scaledSize: new google.maps.Size(markerSize, markerSize), // The marker icon (svg) is scaled to match marker size.
            // Note: if size is smaller than scaledSize, marker icon gets cropped.
            origin: new google.maps.Point(0, 0), // The origin of marker is (0, 0).
            anchor: new google.maps.Point(25, 50) // The anchor for of marker is x=25px y=50px.
          },
          //shape: shape,
          title: country['name-' + this.$app.locale()],
          //zIndex: beach[3]
        })

        marker.addListener('click', () => {
          this.$emit('marker-clicked', key)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.google-map {
  width: 100%;
  min-height: 300px;
  position: relative;
  overflow: hidden;
  padding: 1px;
  /* &::after {
    content: '';
    @extend %absolute-0000;
    pointer-events: none;
  } */

  &::v-deep {
    // hide google maps' tos etc. (not legal :)
    .gm-style-cc {
      display: none !important;
    }
    .gm-bundled-control {
      display: none !important;
      //top: 0 !important;
      //left: 0 !important;
      //right: unset !important;
      //bottom: unset !important;
      //margin: 10px 0 0 10px !important;
    }
  }
}
</style>
