<template>
  <base-link
    class="footer-link"
    :to="to"
  >
    <base-title
      :class="{ active: active }"
      :size="9"
      :weight="900"
    >
      <slot></slot>
    </base-title>
  </base-link>
</template>

<script>
export default {
  name: 'footerLink',

  props: {
    to: [String, Object],
    active: Boolean
  }
}
</script>

<style lang="scss" scoped>
$footer-link--color: $app-color--main;
$footer-link--color-hl: $app-color--hl;

.footer-link {
  .base-title {
    position: relative;
    display: flex;
    align-items: center;
    &::before {
      content: "";
      margin-right: 0;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      display: inline-block;
      width: 0;
      height: 3px;
      background: $footer-link--color;
      transition: all 0.5s ease;
    }
    &:hover {
      &::before {
        margin-right: 0.3em;
        width: 10px;
      }
    }
    &.active {
      //color: $footer-link--color-hl;
      @extend %disabled;
      &:before {
        margin-right: 0.3em;
        width: 10px;
        background: $footer-link--color-hl;
        color: $footer-link--color-hl;
      }
    }
  }
  &:hover {
    //.base-title { color: $footer-link--color-hl; }
  }
}
</style>
