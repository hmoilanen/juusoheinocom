<script>
// Customise markers, see: https://developers.google.com/maps/documentation/javascript/custom-markers

export default {
  name: 'googleMapMarker',

  inject: ['getGoogleMap'],

  props: ['places'],

  created() {    
    let self = this
    let imageURL = this.$store.getters['app/GET_URL'].imageURL + 'gallery/markers/'

    function setMarker(map) {      
      self.places.forEach(place => {        
        new google.maps.Marker({
          position: place.position,
          map: map,
          //icon: imageURL + 'india.svg'
          icon: {
            //url: imageURL + 'cambodia.png',
            url: imageURL + 'india.svg',
            //url: imageURL + 'srilanka.pdf',
            size: new google.maps.Size(50, 50), // The marker is 50px wide by 50px high.
            scaledSize: new google.maps.Size(50, 50), // The marker icon (svg) is scaled to match marker size.
            // Note: if size is smaller than scaledSize, marker icon gets cropped.
            origin: new google.maps.Point(0, 0), // The origin of marker is (0, 0).
            anchor: new google.maps.Point(25, 50) // The anchor for of marker is x=25px y=50px.
          }
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
