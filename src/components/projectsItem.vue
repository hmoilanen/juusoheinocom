<template>
  <div class="projects-item">
    <template v-if="item">
      <div class="bg">
        <base-bg :source="imageURL(item.bg)" posY="top"></base-bg>
      </div>
      <base-flex align="baseline">
        <base-title m-t="s">{{ this.item['title-' + $app.locale()] || 'item' }}</base-title>  
        <base-text m-l="s">{{ this.item.year }}</base-text>
      </base-flex>
      <base-title :size="6" m-b="l">{{ this.item['type-' + $app.locale()] }}</base-title>
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
  //&:not(:last-child) { margin-bottom: 3rem; }
  .bg {
    position: relative;
    @extend %clickable;
    height: 0;
    padding-bottom: 62.5%;
  }
}
</style>
