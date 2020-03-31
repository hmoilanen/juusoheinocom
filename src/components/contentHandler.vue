<template>
  <div class="content-handler" style="styling">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'contentHandler',

  computed: {
    styling() {
      return {
        zIndex: this.$store.state.app.ui.zIndex.contentHandler
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$carousel-color: $app-color--theme;
$carousel-color--bg: rgba(0, 0, 0, 0.95);

.content-handler {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $carousel-color--bg;
}
</style>
