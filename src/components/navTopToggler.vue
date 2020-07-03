<template>
  <div class="nav-top-toggler">
    <!-- <base-flex center="x" :column="true">
      <div>now: {{ this.mode }}</div>
      <div>prev: {{ this.previousMode }}</div>
    </base-flex> -->
    <base-title>{{ this.togglerText }}</base-title>

    <div class="bars">
      <div class="top" :style=styling.top></div>
      <div class="mid" :style=styling.mid></div>
      <div class="bot" :style=styling.bot></div>
    </div>

    <!-- POISTUU!!! -->
    <!-- POISTUU!!! -->
    <!-- POISTUU!!! -->
    <!-- <base-flex class="napit" center="x">
      <base-button
        v-for="(nappi, index) in modes"
        :key="nappi"
        @click="mode = nappi"
        m-r="s"
        :empty="index === 0"
      >{{ nappi }}</base-button>
    </base-flex> -->

  </div>
</template>

<script>
//LISÄÄ TÄNNE TARKASTELU KOSKA navTopDd ON AUKI
//...JA SIIRRÄ KO. animationSTATE STOREEN, KOSKA SITÄ TIETOA TARVITAAN MUUALLAKIN
//... JA KUN SE ON AUKI, MUUTA TOGGLERIN VÄRI !!!
export default {
  name: 'navTopToggler',

  props: {
    mode: {
      type: String,
      default: 'initial',
      validator(prop) {
        return ['initial', 'menu', 'close', 'back'].indexOf(prop) !== -1
      }
    }
  },

  data() {
    return {
      //modes: ['centered', 'initial', 'menu', 'close', 'back'], //POISTUU!!!
      //mode: 'initial',
      animationState: 'initial',
      previousMode: '',
      animationStateChangeDuration: 0.4 // = s
    }
  },

  watch: {
    mode: {
      immediate: true,
      handler(newValue, oldValue) {
        this.previousMode = oldValue
        this.animationState = ''
        setTimeout(() => {
          this.previousMode = ''
          this.animationState = newValue
        }, this.animationStateChangeDuration * 1000)
      }
    }
  },

  computed: {
    togglerText() {
      if (this.mode !== 'initial') {
        return this.mode 
      } else return ''
    },

    styling() {
      let width = 25 // = px
      let height = 4 // = px
      let gapY = 10 // = px
      let top = {
        width: width + 'px',
        height: height + 'px'
      }
      let mid = {
        width: width + 'px',
        height: height + 'px'
      }
      let bot = {
        width: width + 'px',
        height: height + 'px'
      }

      if (this.animationState === 'initial') {
        top.width = `${height}px`
        mid.width = `${height}px`
        bot.width = `${height}px`
      } else if (this.animationState === 'menu') {
        top.transform = `translateY(-${gapY}px)`
        bot.transform = `translateY(${gapY}px)`
      } else if (this.animationState === 'close') {
        top.transform = `rotate(-${45}deg)`
        mid.transform = `rotate(${45}deg)`
        bot.transform = `rotate(${45}deg)`
      } else if (this.animationState === 'back') {
        top.transform = `rotate(${45}deg) scaleX(0.8)`
        bot.transform = `rotate(-${45}deg) scaleX(0.8)`
      } // else { this.animationState === '' }, see: $watch.mode

      if (this.animationState === 'back' || this.previousMode === 'back') {
        top.transformOrigin = 'right top'
        bot.transformOrigin = 'right bottom'
      }

      return {
        top: top,
        mid: mid,
        bot: bot
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$bars--color-bg: $app-color--main;

.nav-top-toggler {
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
  .bars {
    height: 100%;
    display: flex;
    align-items: center;
    background: pink;
  }
  .top,
  .mid,
  .bot {
    // see: this.styling
    transition: width 0.6s ease, transform 0.4s ease-in-out;
    position: absolute;
    background: $bars--color-bg;
  }
}
</style>
