<template>
  <div class="google-map"></div>
</template>

<script>
// API key: AIzaSyCVrXF_Jh-nfPCeMYgYTkIPl3aP0o9HOyw

// Google maps API: https://developers.google.com/maps/documentation/javascript/reference#Map
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
      type: [Array, Object],
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
    //hideMarkers: Boolean, //POISTUUKO MYÖS KUN MARKER EI OLE ENÄÄ ERILLINEN KOMPONENTTI?!?!
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
	
	data() {
		return {
			map: null,
			//isCentered: false,
			centerPointLat: 34.000,
			centerPointLng: 103.000,
			//PITÄISIKÖ SIIRTÄÄ TÄÄLTÄ KOKONAAN POIS / KANTAAN?!?!?!?!
			//PITÄISIKÖ SIIRTÄÄ TÄÄLTÄ KOKONAAN POIS / KANTAAN?!?!?!?!
			//PITÄISIKÖ SIIRTÄÄ TÄÄLTÄ KOKONAAN POIS / KANTAAN?!?!?!?!
			bounds: { // see: https://aiocollective.com/blog/getbounds-in-google-maps-api-v3/
				north: 57.07670482545557,
				east: 129.2342899123354,
				south: 8.385667828489359,
				west: 76.67569616233541
			}
		}
	},

  mounted() {
    this.initMap()
    this.$on('hook:updated',() => {
      this.initMap()
		})
	},

	/* watch: {
		map() {
			console.log('mäppi');
		}
	}, */

  methods: {
    initMap() {
      this.map = new google.maps.Map(this.$el, {
        center: {
          lat: this.centerPointLat,
          lng: this.centerPointLng
				},
        //zoom: this.places['russia'].zoom,
        zoom: 4,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        styles: this.mapStyle ? googleMapStyles[this.mapStyle] : false,
        // Map control UI:
        mapTypeControl: this.mapTypes,
        streetViewControl: this.streetView,
        disableDefaultUI: this.disableDefaultUi
        //zoomControl: boolean,
        //scaleControl: boolean,
        //rotateControl: boolean,
        //fullscreenControl: boolean
      })

    	this.setMarkers(this.map)
      /* if (!this.hideMarkers) {
        this.setMarkers(this.map)
			} */

			//this.map.fitBounds(this.bounds)
			this.fitMap()

			this.map.addListener('center_changed', () => {
				console.log('center_changed');
				this.$emit('map-centered', false)
			})
			/* this.map.addListenerOnce('idle', () => {
				console.log('idle');
				//this.$emit('map-centered', false)
			}) */

			//this.map.event.addListenerOnce()
			google.maps.event.addListenerOnce(
				this.map,
				'idle',
				() => {
					console.log('idle');
					this.$emit('map-centered', true)
				}
			)

			// Because Google doesn't provide event for knowing when the map has fully loaded,
			// and it triggers 'map-centered' event multiple times during initiation,
			// and in parent the state has to be true in the beginning.
			//this.$emit('map-centered', true)

			/* this.map.addListener('idle', () => {
				const bounds = this.map.getBounds()
				console.log('bounds', bounds);
				const ne = bounds.getNorthEast()
				const sw = bounds.getSouthWest()
				console.log('ne', ne);
				console.log('sw', sw);
				//this.bounds = bounds
				//this.$set(this.bounds, 'ne', ne)
				//this.$set(this.bounds, 'sw', sw)
			}) */

			/* this.map.addListener('center_changed', () => {
				console.log('jooo');
				if (this.isCentered) {
					this.isCentered = false
					this.$emit('map-centered', false)
				}
			}) */

			/* this.map.addListener('idle', () => {
				console.log('aaaaaa');
			}) */

			/* this.map.addListener('center_changed', () => {
				window.setTimeout(() => {
					this.map.panTo(marker.getPosition())
				}, 3000)
			}) */
			
			//METHODS: ESIMERKIT
			/* var bounds = {
				north: -25.363882,
				south: -31.203405,
				east: 131.044922,
				west: 125.244141
			};
			// Display the area between the location southWest and northEast.
			map.fitBounds(bounds) */

			//EVENTS: ESIMERKIT

			/* map.addListener('center_changed', function() {
			// 3 seconds after the center of the map has changed, pan back to the
			// marker.
			window.setTimeout(function() {
				map.panTo(marker.getPosition());
			}, 3000); */
    },

    setMarkers(map) {
      let markerURL = this.$store.getters['app/GET_URL'].imageURL + 'gallery/markers/'
      let markerSize = 40 //DUMMY!

      for (let key in this.places) {
				let country = this.places[key]
        let marker = new google.maps.Marker({
          position: { lat: country.latitude, lng: country.longitude },
          map: map,
          icon: {
            url: markerURL + key + '.svg',
            //url: markerURL + country['name-en'].toLowercase() + '.svg',
            //url: `${markerURL}${country['name-en'].toLowerCase()}.svg`,
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
					this.map.panTo(marker.getPosition())
				})
				
				/* this.map.addListener('center_changed', () => {
					console.log('keskipiste liikku');
				}) */
      }
		},
		
		centerMap() {
			this.map.panTo({
				//lat: this.places[0].position.lat,
				//lng: this.places[0].position.lng
				lat: this.centerPointLat,
				lng: this.centerPointLng
			})
			//this.map.fitBounds(this.bounds)
		},

		fitMap() {
			this.map.fitBounds(this.bounds)
			this.$emit('map-centered', true)
			//if (!this.isCentered) { this.$emit('map-centered', true) }
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
