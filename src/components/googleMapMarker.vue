<script>
export default {
  name: 'googleMapMarker',

  inject: ['getGoogleMap'],

  props: ['places'],

  created() {    
    let self = this

    function setMarker(map) {      
      self.places.forEach(place => {        
        new google.maps.Marker({
          position: place.position,
          map: map
        })
      })
    }

    this.getGoogleMap(setMarker)
  },

  render(h) {
    return null
  }
}
</script>
