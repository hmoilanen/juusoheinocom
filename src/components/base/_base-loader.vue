<template>
  <div class="base-loader" :style="mixinMargins">

    <div v-if="mode === 'spots'" class="spots-container">
      <span>loading</span>
      <div class="spots">
        <div class="spot"></div>
        <div class="spot"></div>
        <div class="spot"></div>
        <div class="spot"></div>
      </div>
    </div>

    <div v-else-if="mode === 'spinner'" class="spinner"></div>

    <div v-else-if="mode === 'kitt'" class="kitt-container">
      <div class="kitt"></div>
    </div>

  </div>
</template>

<script>
import { margins } from '@/utils/mixins'

export default {
  name: 'baseLoader',

  mixins: [margins],

  props: {
    mode: {
      type: String,
      default: 'kitt'
    }
  }
}
</script>

<style lang="scss" scoped>
$loader-color--highlight: $app-color--hl;
$loader-color--secondary: rgba(0, 0, 0, 0.45);

.base-loader {
  display: flex;
  align-items: center;
  justify-content: center;

  .spots-container {
    display: flex;
    flex-direction: column;
    span {
      margin-left: -0.3rem;
      margin-bottom: 0.3rem;
      text-align: center;
      font-weight: 500;
      color: $loader-color--secondary;
      &::after {
        content: "...";
        position: absolute;
      }
    }
    .spots {
      $four-spots--spot-width: 1rem;

      position: relative;
      width: 60px;

      .spot {
        position: absolute;
        width: $four-spots--spot-width;
        height: $four-spots--spot-width;
        border-radius: 50%;
        background: $loader-color--highlight;
        transform: translateX(-50%);
        //transition: all 1s cubic-bezier(0, 0.8, 1, 0.2);
        //transition: all 1s linear;

        &:nth-child(1) {
          left: 0;
          animation: spot-1 1s infinite;
        }
        &:nth-child(2) {
          left: 0;
          animation: spot-2 1s infinite;
        }
        &:nth-child(3) {
          left: 50%;
          animation: spot-3 1s infinite;
        }
        &:nth-child(4) {
          left: 100%;
          animation: spot-4 1s infinite;
        }

        @keyframes spot-1 {
          0%,
          20% { transform: translateX(-50%) scale(0); }
          100% { transform: translateX(-50%) scale(1); }
        }
        @keyframes spot-2 {
          0% { left: 0%; }
          100% { left: 50%; }
        }
        @keyframes spot-3 {
          0% { left: 50%; }
          100% { left: 100%; }
        }
        @keyframes spot-4 {
          0% { transform: translateX(-50%) scale(1); }
          80%,
          100% { transform: translateX(-50%) scale(0); }
        }
      }
    }
  }

  .spinner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 5px solid $loader-color--secondary;
    border-top: 5px solid $loader-color--highlight;
    animation: spin 1.3s linear infinite;

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }

  .kitt-container {
    $kitt-duration: 1.3s;

    position: relative;
    width: 120px;
    height: 5px;
    background: lightgrey;
    animation: flip calc(#{$kitt-duration} * 2) infinite;

    @keyframes flip {
      0%, 50% { transform: rotate(0); }
      50.001%, 100% { transform: rotate(180deg); }
    }

    .kitt {
      position: absolute;
      top: 0;
      height: 100%;
      background: $app-color--hl;
      animation: slide $kitt-duration linear infinite;

      @keyframes slide {
        0% {
          left: 0;
          right: 100%;
        }
        10% { left: 0; }
        18% { right: 0; }
        60% { left: 100%; }
      }
    }
  }
}
</style>
