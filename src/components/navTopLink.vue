<template>
  <base-link
    :to="to"
    mode="router"
    tag="div"
    class="nav-top-link"
    :style="mixinMargins"
  >
    <span>
      <slot>default link text</slot>
    </span>
  </base-link>
</template>

<script>
// TÄMÄ ON IHAN PASKA / KESKEN -> VIIMEISTELE
import { margins } from "@/utils/mixins";

export default {
  name: "navTopLink",

  mixins: [margins],

  props: {
    to: {
      type: [String, Object, Function]
    }
  }
};
</script>

<style lang="scss" scoped>
$link-color: $app-color--theme;
$link-color-hover: $app-color--hl;

.nav-top-link {
  height: 100%;
  display: flex;
  align-items: center;
  span {
    //padding: 0.4rem 1.4rem;
    padding: 0.4rem 0;
    position: relative;
    display: inline-block;
    text-align: center;
    font-weight: 700;
    color: $link-color;
    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      height: 2px;
      width: 0%;
      opacity: 0.05;
      transition: all 0.65s cubic-bezier(0, 0.76, 0.57, 1);
      background: $link-color;
    }
    &:hover {
      color: $link-color-hover;
      &::after {
        width: 100%;
        opacity: 1;
        background: $link-color-hover;
      }
    }
  }

  // OTA KÄYTTÖÖÖÖÖN JA VIIMEISTELE KOMPONENTTI!!!!!
  // OTA KÄYTTÖÖÖÖÖN JA VIIMEISTELE KOMPONENTTI!!!!!
  // OTA KÄYTTÖÖÖÖÖN JA VIIMEISTELE KOMPONENTTI!!!!!
  //&.router-link-active { color: red; }
  &.router-link-exact-active {
    color: $link-color-hover;
  }
}
</style>
