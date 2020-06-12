<template>
  <div class="projects-item">
    <base-bg></base-bg>
    <base-title>{{ this.item.title || 'item' }}</base-title>
    <template v-if="item">
      <base-text>{{ this.item.year }}</base-text>
      <base-text>{{ this.item.text }}</base-text>
    </template>
  </div>
</template>

<script>
export default {
  name: 'projectsItem',

  props: {
    item: Object
  }
}
</script>

<style lang="scss" scoped>
.projects-item {
  position: relative;
  @extend %clickable;
  
  //POISTUU!
  border: 1px solid lightgrey;
  padding: 1rem;
  .base-bg { opacity: 0.6; }
}
</style>
