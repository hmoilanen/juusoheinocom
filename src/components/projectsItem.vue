<template>
  <div class="projects-item">
    <template v-if="item">
      
      <div class="bg">
        <base-bg :source="imageURL(item.bg)" posY="top"></base-bg>
      </div>

      <div class="info">
        <base-title :size="11">{{ this.item['title-' + $app.locale()] || 'item' }}</base-title>  
        <base-title :size="7">{{ this.item['type-' + $app.locale()] }}, {{ this.item.year }}</base-title>
      </div>

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
  @extend %clickable;
  //background: rgba(0, 0, 0, 1);
  border: 3px solid black;
  //padding: 0.5rem;
  .info {
    padding: 1rem 0.6rem;
    //.base-title,
    //.base-text { color: white; }
  }
  .bg {
    position: relative;
    height: 0;
    //padding-bottom: 62.5%;
    padding-bottom: 80%;
  }
}
</style>
