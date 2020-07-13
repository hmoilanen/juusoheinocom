<template>
  <div class="locale-toggler">
    <base-title
      class="locale"
      v-for="locale in localeList"
      :key="locale"
      @click="chooseLocale(locale)"
      :size="size"
      :class="{
        active: currentLocale === locale,
        disabled: locale === '/',
        alternative: alternative
      }"
    >{{ locale }}</base-title>
  </div>
</template>

<script>
export default {
  name: 'localeToggler',

  props: {
    size: {
      type: Number,
      default: 8
    },
    alternative: Boolean
  },

  data() {
    return {
      localeList: ['en', '/', 'fi']  // (Change for dynamic if needed)
    }
  },

  computed: {
    currentLocale() {
      return this.$app.locale()
    }
  },

  methods: {
    chooseLocale(locale) {
      this.$store.dispatch('SET_STATE', { data: locale, path: 'app.locale' })
    }
  }
}
</script>

<style lang="scss" scoped>
$locale-toggler--color-hl: $app-color--hl;
$locale-toggler--color-alternative: $app-color--theme;

.locale-toggler {
  display: flex;
  .locale {
    @extend %clickable;
    transition: color 0.25s ease;
    &.alternative {
      color: $locale-toggler--color-alternative;
    }
    &.disabled {
      @extend %disabled;
      margin: 0 0.45em 0 0.4em;
    }
    &.active {
      color: $locale-toggler--color-hl;
      opacity: 1;
    }
  }
}
</style>
