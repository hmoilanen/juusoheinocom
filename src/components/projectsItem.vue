<template>
  <div class="projects-item">
    <base-bg :source="imageURL(item.bg)"></base-bg>
    <base-title>{{ this.item['title-' + $app.locale()] || 'item' }}</base-title>
    <template v-if="item">
      <base-text>{{ this.item.year }}</base-text>
      <base-text>{{ this.item['text-' + $app.locale()] }}</base-text>
    </template>
  </div>
</template>

<script>
export default {
  name: 'projectsItem',

  props: {
    item: Object
  },

  methods: {
    imageURL(URL) {
      let imageURL = this.$store.getters['app/GET_URL'].imageURL
      return `${imageURL}${this.$route.name}/${this.$vnode.key}/${URL}`
    }
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
