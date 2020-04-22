<template>
  <div class="menu-toggler" @click="toggle" v-on="listeners">
    <div
      v-for="(line, index) in 3"
      :key="index"
      class="line"
      :class="classing"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'taskCloser',

  props: { state: Boolean },

  data() {
    return {
      basicState: true // = menu icon state
    }
  },


  methods: {
    toggle() {
      this.basicState = !this.basicState
    }
  },

  computed: {
    listeners() {
      return { ...this.$listeners }
    },

    classing() {
      // Note: if menu is opened icon must suggest closing it 
      let displayed = this.basicState ? 'to-close' : 'to-open'

      return {
        [displayed]: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$line-thickness: 4.5px;
$line-length: 20px;
$line-gap: 8px;
$animation-duration: 0.6s;

.menu-toggler {
  flex-shrink: 0;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: $line-length;
  height: 50px;
  @extend %clickable;

  .line {
    position: absolute;
    width: $line-length;
    height: $line-thickness;
    background: $app-color--main;

    @for $i from 1 through 3 {
      &:nth-child(#{$i}) {
        animation: #{"anim-init-" + $i} $animation-duration ease-in-out forwards;
      }
    }

    &.to-close {
      @for $i from 1 through 3 {
        &:nth-child(#{$i}) {
          animation: #{"anim-close-" + $i} $animation-duration ease-in-out forwards;
        }
      }
    }

    &.to-open {
      @for $i from 1 through 3 {
        &:nth-child(#{$i}) {
          animation: #{"anim-open-" + $i} $animation-duration ease-in-out forwards;
        }
      }
    }

    @keyframes anim-open-1 {
      0% { transform: rotate(0deg) translateY(-#{$line-gap}); }
      33%, 66% { transform: rotate(0deg) translateY(0px); }
      100% { transform: rotate(-45deg); }
    }
    @keyframes anim-open-2 {
      0% { opacity: 1; }
      66%, 100% { opacity: 0; }
    }
    @keyframes anim-open-3 {
      0% { transform: rotate(0deg) translateY(#{$line-gap}); }
      33%, 66% { transform: rotate(0deg) translateY(0px); }
      100% { transform: rotate(45deg); }
    }

    @keyframes anim-close-1 {
      0% { transform: rotate(-45deg); }
      33%, 66% { transform: rotate(0deg); }
      100% { transform: rotate(0deg) translateY(-#{$line-gap}); }
    }
    @keyframes anim-close-2 {
      0% { opacity: 0; }
      66%, 100% { opacity: 1; }
    }
    @keyframes anim-close-3 {
      0% { transform: rotate(45deg); }
      33%, 66% { transform: rotate(0deg); }
      100% { transform: rotate(0deg) translateY(#{$line-gap}); }
    }
  }
}
</style>
