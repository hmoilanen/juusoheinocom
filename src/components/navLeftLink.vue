<template>
  <div class="nav-left-link" @click="linkTo">
    <slot>default link text</slot>
  </div>
</template>

<script>
export default {
  name: 'navLeftLink',

  props: {
    to: [String, Object] // expects String as $route.name, Object as $router.push({})
  },

  methods: {
    linkTo() {
      if (typeof this.to === 'string') {
        this.$router.push({ name: this.to })
      } else {
        this.$router.push(this.to)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$nav-left-link-color: $app-color--main;
$nav-left-link-color--hover: $app-color--theme;
$nav-left-link-color--hover-bg: $app-color--main;

.nav-left-link {
  padding: 0.6rem 1.2rem;
  color: $nav-left-link-color;
  font-weight: 700;
  @extend %clickable;
  &:hover {
    background: $nav-left-link-color--hover-bg;
    color: $nav-left-link-color--hover;
  }
}
</style>
