<template>
  <transition name="exit">
    <div class="app-curtain" :style="styling">
      <base-icon app="juusoheino" :size="50">juusoheino</base-icon>
      <!-- <div class="logo">
        <base-icon
          class="intro"
          :size="70"
          tooltip="osb"
        >osb-intro</base-icon>
        <base-icon
          class="intro left"
          :class="{ initial: initialState }"
          :size="70"
          tooltip="osb"
        >osb-intro-left</base-icon>
        <base-icon
          class="intro right"
          :class="{ initial: initialState }"
          :size="70"
          tooltip="osb"
        >osb-intro-right</base-icon>
        <base-icon
          :class="{ initial: initialState }"
          :size="95"
          tooltip="osb"
        >osb-logo-text</base-icon>
      </div> -->
    </div>
  </transition>
</template>

<script>
//HUOM! TÄSSÄ KOMPONENTISSA ON VIELÄ SISÄLLÄ KAIKKEA TURHAA LOGIIKKAA
//-> FIXAA LOPUKSI ANIMAATION YHTEYDESSÄ JA POISTA KAIKKI KUONA!

export default {
  name: 'appCurtain',

  data() {
    return {
      initialState: true,
      minimumDuration: 10,
      minimumDurationPassed: false
    }
  },

  mounted() {
    setTimeout(() => {
      // when to start intro animation after initiation
      this.initialState = false
    }, 600)

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
      this.$store.dispatch('SET_STATE', { data: false, path: 'ui.curtainDisplayed' })
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

  .logo {
    position: relative;
    margin-bottom: 60px;
    width: 140px;
    height: 140px;

    /* .base-icon {
      user-select: none;
      pointer-events: none;
      &:last-child {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 65%);
        transition: all 0.5s ease 0.5s;
        &.initial { opacity: 0; }
      }
    } */

    /* .intro {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.5s ease;
      &.initial {
        opacity: 0;
        &.left {
          top: 100%;
          left: 0%;
        }
        &.right {
          top: 0%;
          left: 100%;
        }
      }
    } */
  }
}

.exit-leave-active {
  transition: transform 0.4s cubic-bezier(0.83, 0.01, 0.86, 0.59);
}
.exit-leave-to {
  transform: translateY(-100%);
}
</style>
