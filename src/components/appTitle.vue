<template>
  <div class="app-title" :style="mixinMargins">
    <div class="line"></div>
    <base-title :size="size" :scaling="1">
      <slot>appTitle.vue</slot>
    </base-title>
    <slot name="icon"></slot>
  </div>
</template>

<script>
import { margins } from '@/utils/mixins'

export default {
  name: 'appTitle',

  mixins: [margins],

  data() {
    return {
      size: 's'
    }
  }
}
</script>

<style lang="scss" scoped>
.app-title {
  margin-bottom: 1em;
  display: flex;
  align-items: center;

  .line {
    margin-right: 0.5rem;
    width: 6vmin;
    min-width: 20px;
    max-width: 30px;
    height: 4px;
    background: black;
  }

  .base-title { margin-right: 0.85rem; }
}
</style>
