<template>
  <transition name="exit">
    <div class="app-curtain" :style="styling">
      <base-icon app="juusoheino" :size="50">juusoheino</base-icon>
      <base-loader v-if="showLoader" class="curtain-loader"></base-loader>
    </div>
  </transition>
</template>

<script>
//TUUNAA LOPUKSI VIELÄ ANIMAATIOT KONDIKSEEN!

export default {
  name: 'appCurtain',

  data() {
    return {
      minimumDuration: 200,
      minimumDurationPassed: false,
      showLoader: true
    }
  },

  mounted() {
    setTimeout(() => {
      this.minimumDurationPassed = true
    }, this.minimumDuration)
  },

  watch: {
    minimumDurationPassed() {
      if (!this.isLoading) {
        this.proceed()
      }
    },

    isLoading() {
      if (this.minimumDurationPassed) {
        this.proceed()
      }
    },
  },

  computed: {
    isLoading() {
      return this.$store.state.app.isLoading
    },

    styling() {
      return {
        zIndex: this.$store.state.ui.zIndex.appCurtain
      }
    }
  },

  methods: {
    proceed() {
      this.showLoader = false
      setTimeout(() => { // for visual purposes (hide loader and then proceed)
        this.$store.dispatch('SET_STATE', { data: false, path: 'ui.curtainDisplayed' })
      }, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
$app-curtain--color: $app-color--theme;
$app-curtain--color-bg: $app-color--main;

.app-curtain {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  //background: $app-curtain--color-bg;
  //background: white;
  background: rgba(255, 255, 255, 0.555);
  color: $app-curtain--color;
  border-bottom: 1px solid grey;

  .curtain-loader {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10vh;
  }
}

.exit-leave-active {
  transition: transform 0.4s cubic-bezier(0.83, 0.01, 0.86, 0.59);
}
.exit-leave-to {
  transform: translateY(-100%);
}
</style>
