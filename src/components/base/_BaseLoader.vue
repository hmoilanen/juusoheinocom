<template>
  <div class="base-loader" :style="mixinMargins">
		<div class="kitt-container">
			<div class="kitt"></div>
		</div>
  </div>
</template>

<script>
import { margins } from '@/utils/mixins'

export default {
  name: 'baseLoader',

  mixins: [margins]
}
</script>

<style lang="scss" scoped>
$loader-color--highlight: $app-color--hl;
$loader-color--secondary: $app-color--secondary;
$loader-duration: 1.3s;

.base-loader {
  display: flex;
  align-items: center;
  justify-content: center;

  .kitt-container {
    position: relative;
    width: 120px;
    height: 3px;
    background: $loader-color--secondary;
    animation: flip calc(#{$loader-duration} * 2) infinite;

    @keyframes flip {
      0%, 50% { transform: rotate(0); }
      50.001%, 100% { transform: rotate(180deg); }
    }

    .kitt {
      position: absolute;
      top: 0;
      height: 100%;
      background: $app-color--hl;
      animation: slide $loader-duration linear infinite;

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
