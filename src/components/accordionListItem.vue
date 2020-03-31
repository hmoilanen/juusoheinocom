<template>
  <div class="accordion-item">
    <div @click="toggle" role="button" class="header">
      <base-flex center="y" justify="between">
        <slot name="header"></slot>
        <base-icon icon="down" :class="{ active: active }"></base-icon>
      </base-flex>
    </div>

    <div class="body" v-show="active">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// TODOS:
// LISÄÄ TÄHÄN mixinSizing !!!

export default {
  name: 'accordionListItem',

  inject: ['accordionListState'],

  props: ['itemId'],

  computed: {
    active () {
      return this.accordionListState.activeItem === this.itemId
    }
  },

  methods: {
    toggle () {
      this.accordionListState.activeItem = this.active ? null : this.itemId
    }
  }
}
</script>

<style lang="scss" scoped>
$accordion-color: $app-color--input;
$accordion-color--border: $app-color--input-border;
$accordion-color--border-secondary: lighten($app-color--input-border, 75%);
$accordion-color--bg-hover: darken($app-color--theme, 4%);
$accordion-padding-x: 1.3em;
$accordion-padding-y: 1.1em;

.accordion-item {
  border-bottom: 1px solid $accordion-color--border;
  color: $accordion-color;
  &:last-child { border-bottom-width: 0; }

  .header {
    user-select: none;
    padding: $accordion-padding-y $accordion-padding-x;
    font-size: 1.1em;
    font-weight: 700;
    @extend %clickable;
    //&:hover { background: $accordion-color--bg-hover; }
    svg {
      flex-shrink: 0;
      margin-left: $accordion-padding-x;
      width: 0.8rem;
      height: 0.8rem;
      @extend %rotate-0;
      &.active { @extend %rotate-180; }
    }
  }

  .body {
    border-top: 1px solid $accordion-color--border-secondary;
    padding: $accordion-padding-y $accordion-padding-x;
    background: $accordion-color--bg-hover;
  }
}
</style>
