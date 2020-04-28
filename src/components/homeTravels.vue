<template>
  <div class="home-travels">
    <base-title>Travels</base-title>
    <base-text m-b="l">
      Some pictures from my ravels. (VIIMEISTELE!)
      <base-link to="/travels">explore travels page</base-link>
    </base-text>
    
    <content-carousel></content-carousel>
  </div>
</template>

<script>
import contentCarousel from '@/components/contentCarousel'

export default {
  name: 'homeTravels',

  components: { contentCarousel },

  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.home-travels {
}
</style>
