<template>
  <div class="accordion-list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'accordionList',

  provide () {
    return {
      accordionListState: this.sharedState
    }
  },

  data () {
    return {
      sharedState: { // Note: This has to be object for data to be reactive
        activeItem: 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$accordion-color: $app-color--input;
$accordion-color--border: $app-color--input-border;
$accordion-color--bg: $app-color--theme;

.accordion-list {
  overflow: hidden;
  border: 1px solid $accordion-color--border;
  border-radius: 3px;
  background-color: $accordion-color--bg;
}
</style>
