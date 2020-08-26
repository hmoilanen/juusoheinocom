<template>
  <div id="google-map" class="google-map"></div>
</template>

<script>
// Google maps API: https://developers.google.com/maps/documentation/javascript/reference#Map
// Google maps platform: https://cloud.google.com/maps-platform/
// Google maps options: https://developers.google.com/maps/documentation/javascript/reference?csw=1#MapTypeControlOptions
// Customize maps' visuals: https://mapstyle.withgoogle.com/
// Customise markers, see: https://developers.google.com/maps/documentation/javascript/custom-markers
// Customize markers - complex icons: https://developers.google.com/maps/documentation/javascript/examples/icon-complex

import { googleMapStyles } from '@/utils/googleMapStyles'
import { countries } from '@/api/countries'

export default {
  name: 'GoogleMap',

  props: {
    places: {
      type: [Array, Object],
      default: () => {
				// Provide array of place props like this:
        return [{
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
    streetView: Boolean, // Enable 3d street view
    mapTypes: Boolean, // Default / satellite view
    disableDefaultUi: Boolean,
    mapStyle: String
	},
	
	data() {
		return {
			map: null,
			centerPointLat: 34.000,
			centerPointLng: 103.000,
			bounds: { // see: https://aiocollective.com/blog/getbounds-in-google-maps-api-v3/
				north: 57.07670482545557,
				east: 129.2342899123354,
				south: 8.385667828489359,
				west: 76.67569616233541
			}
		}
	},

  mounted() {
		const googleApiKey = process.env.VUE_APP_GOOGLE_MAPS_API_KEY

		if (!document.getElementById('google-map--script')) {
      let googleInit = document.createElement('script')
      googleInit.async = true
      googleInit.defer = true
      googleInit.id = 'google-map--script'
      googleInit.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&callback`)
      document.head.appendChild(googleInit)
      googleInit.onload = () => this.initMap()
    } else {
      this.initMap()
    }

    this.$on('hook:updated',() => {
      this.initMap()
		})
	},

  methods: {
    initMap() {
      this.map = new google.maps.Map(this.$el, {
        center: {
          lat: this.centerPointLat,
          lng: this.centerPointLng
				},
        zoom: 4,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        styles: this.mapStyle ? googleMapStyles[this.mapStyle] : false,
        // Map's controls UI:
        mapTypeControl: this.mapTypes,
        streetViewControl: this.streetView,
        disableDefaultUI: this.disableDefaultUi
        //zoomControl: boolean,
        //scaleControl: boolean,
        //rotateControl: boolean,
        //fullscreenControl: boolean
      })

    	this.setMarkers(this.map)
			this.fitMap()

			this.map.addListener('center_changed', () => this.$emit('map-centered', false))

			google.maps.event.addListenerOnce(
				this.map,
				'idle',
				() => this.$emit('map-centered', true)
			)
    },

    setMarkers(map) {
      let markerURL = this.$store.getters['app/GET_URL'].imageURL + 'gallery/markers/'
      let markerSize = 40 // = dummy!

      for (let key in this.places) {
				let country = this.places[key]
        let marker = new google.maps.Marker({
          position: { lat: country.latitude, lng: country.longitude },
          map: map,
          icon: {
            url: markerURL + key + '.svg',
            size: new google.maps.Size(markerSize, markerSize),
            scaledSize: new google.maps.Size(markerSize, markerSize), // The marker icon (svg) is scaled to match marker size
            // Note: if size is smaller than scaledSize, marker icon gets cropped.
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(25, 50) // The anchor for of marker is x=25px, y=50px
          },
          title: country['name-' + this.$app.locale()],
          //shape: shape,
          //zIndex: 1
        })

        marker.addListener('click', () => {
					this.$emit('marker-clicked', key)
					this.map.panTo(marker.getPosition())
				})
      }
		},
		
		centerMap() {
			this.map.panTo({
				lat: this.centerPointLat,
				lng: this.centerPointLng
			})
		},

		fitMap() {
			this.map.fitBounds(this.bounds)
			this.$emit('map-centered', true)
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

  &::v-deep {
    // hide google maps' tos etc. (not legal :)
    .gm-style-cc { display: none !important; }
    .gm-bundled-control { display: none !important; }
	}
}
</style>