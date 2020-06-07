<template>
  <div class="projectsItem">
    <base-bg></base-bg>
    <base-title>{{ this.item.title || 'item' }}</base-title>
    <base-text>{{ this.item.year }}</base-text>
    <base-text>{{ this.item.text }}</base-text>
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
.projectsItem {
  position: relative;
  
  //POISTUU!
  border: 1px solid lightgrey;
  padding: 1rem;
  .base-bg { opacity: 0.6; }
}
</style>
