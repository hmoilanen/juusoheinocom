<template>
  <div
    class="app-external-links"
    :class="{ alternative: alternative }"
  >
    <base-link
      v-for="link in links"
      :key="link.title"
      :to="link.link"
      mode="tab">
      <base-icon
        :icon="link.icon"
        :size="12"
        :scaling="1"
      ></base-icon>
    </base-link>
  </div>
</template>

<script>
export default {
  name: 'appExternalLinks',

  props: {
    alternative: Boolean // For styling
  },

  computed: {
    links() {
      return this.$store.state.app.externals
    }
  }
}
</script>

<style lang="scss" scoped>
$app-external-link--color: $app-color--theme;
$app-external-link--color-alternative: $app-color--main;
$app-external-link--color-hl: $app-color--hl;

.app-external-links {
  display: flex;
  .base-link {
    display: block;
    &:not(:last-child) { margin-right: 1.2rem; }
  }
  .base-icon {
    color: $app-external-link--color-alternative;
    &:hover { color: $app-external-link--color-hl !important; }
  }
  &.alternative {
    .base-icon { color: $app-external-link--color; }
  }
}
</style>
